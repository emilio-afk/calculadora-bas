const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const REQUEST_TIMEOUT_MS = Number(process.env.AI_AGENT_TIMEOUT_MS || 6000);

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
    body: JSON.stringify(body),
  };
}

function cleanText(value, maxLen) {
  if (!value) return "";
  return String(value).replace(/\s+/g, " ").trim().slice(0, maxLen);
}

function parseJsonBody(raw) {
  try {
    return JSON.parse(raw || "{}");
  } catch (error) {
    return {};
  }
}

function extractJson(text) {
  if (!text) return null;
  const normalized = text.trim().replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  try {
    return JSON.parse(normalized);
  } catch (error) {
    const first = normalized.indexOf("{");
    const last = normalized.lastIndexOf("}");
    if (first === -1 || last === -1 || first >= last) return null;
    try {
      return JSON.parse(normalized.slice(first, last + 1));
    } catch (inner) {
      return null;
    }
  }
}

function money(value, lang, currency) {
  const amount = Number(value) || 0;
  const locale = lang === "en" ? "en-US" : "es-MX";
  const safeCurrency = cleanText(currency || "USD", 3) || "USD";
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: safeCurrency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    return `${safeCurrency} ${Math.round(amount)}`;
  }
}

function withPrefix(lang, text) {
  const prefix = lang === "en" ? "Next:" : "Siguiente:";
  const cleaned = cleanText(text, 130);
  if (!cleaned) return prefix;
  if (cleaned.toLowerCase().startsWith(prefix.toLowerCase())) return cleaned;
  return `${prefix} ${cleaned}`;
}

function buildNudgeFallback(context) {
  const lang = context.lang === "en" ? "en" : "es";
  const step = cleanText(context.step || "", 20);
  const isQuiz = step === "quiz";
  const role = cleanText(context.roleLabel || (lang === "en" ? "leader" : "lider"), 30);
  const trigger = cleanText(context.triggerType || "progress", 20);
  const risk = cleanText((context.riskAxes && context.riskAxes[0]) || "", 28);
  const nextAction = cleanText(context.nextAction || "", 120);
  const completion = Number(context.completionPct || 0);
  const impact = Number(context?.scenarios?.base || 0);

  if (isQuiz) {
    let message = lang === "en" ? `Keep it neutral, ${role}.` : `Mantenlo neutral, ${role}.`;
    if (trigger === "hesitation") {
      message = lang === "en" ? `Take your time, ${role}.` : `Toma tu tiempo, ${role}.`;
    } else if (trigger === "milestone") {
      message = lang === "en" ? `Great progress: ${completion}%.` : `Buen avance: ${completion}%.`;
    }

    const insight = withPrefix(
      lang,
      lang === "en"
        ? `answer with last-90-day frequency; then ${nextAction}`
        : `responde por frecuencia de los ultimos 90 dias; luego ${nextAction}`,
    );
    return {
      source: "local",
      message: cleanText(message, 90),
      insight: cleanText(insight, 150),
    };
  }

  let message = lang === "en" ? `Keep going, ${role}.` : `Sigue, ${role}.`;
  if (trigger === "hesitation") {
    message = lang === "en" ? `Do not stop now, ${role}.` : `No te frenes ahora, ${role}.`;
  } else if (trigger === "risk") {
    message = lang === "en" ? `There is money at risk, ${role}.` : `Hay dinero en juego, ${role}.`;
  } else if (trigger === "milestone") {
    message = lang === "en" ? `Great progress: ${completion}%.` : `Buen avance: ${completion}%.`;
  } else if (trigger === "lead_push") {
    message = lang === "en" ? `One step left, ${role}.` : `Estas a un paso, ${role}.`;
  }

  let insight = withPrefix(lang, nextAction || (lang === "en" ? "continue to the next step" : "continua al siguiente paso"));
  if (trigger === "risk" && risk) {
    insight = withPrefix(
      lang,
      lang === "en"
        ? `priority risk is ${risk}; continue with ${nextAction}`
        : `el riesgo principal es ${risk}; continua con ${nextAction}`,
    );
  } else if (impact > 0) {
    insight = withPrefix(
      lang,
      lang === "en"
        ? `${nextAction} (impact ${money(impact, lang, context.currency)})`
        : `${nextAction} (impacto ${money(impact, lang, context.currency)})`,
    );
  }

  return {
    source: "local",
    message: cleanText(message, 90),
    insight: cleanText(insight, 150),
  };
}

function buildQAFallback(context) {
  const lang = context.lang === "en" ? "en" : "es";
  const step = cleanText(context.step || "", 20);
  const isQuiz = step === "quiz";
  const q = cleanText(context.question || "", 220).toLowerCase();
  const nextAction = cleanText(context.nextAction || "", 120);

  if (!q) {
    return {
      source: "local",
      answer:
        lang === "en"
          ? `Tell me your question and I will guide you. Next: ${nextAction}`
          : `Dime tu duda y te guio. Siguiente: ${nextAction}`,
      };
  }

  if (isQuiz) {
    const asksForOption =
      q.includes("opcion") ||
      q.includes("opción") ||
      q.includes("option") ||
      q.includes("responder") ||
      q.includes("respuesta") ||
      q.includes("answer") ||
      q.includes("correcta") ||
      q.includes("correct");
    if (asksForOption) {
      return {
        source: "local",
        answer:
          lang === "en"
            ? `I cannot choose for you. Use this rule: last 90 days, most frequent pattern, then continue.`
            : `No elijo por ti. Usa esta regla: ultimos 90 dias, patron mas frecuente, y continua.`,
      };
    }
    return {
      source: "local",
      answer:
        lang === "en"
          ? `Use one concrete episode from the last 90 days, then pick the option that best matches frequency.`
          : `Usa un episodio concreto de los ultimos 90 dias y elige la opcion que mejor refleje su frecuencia.`,
    };
  }

  if (q.includes("volumen") || q.includes("volume")) {
    return {
      source: "local",
      answer:
        lang === "en"
          ? `Use an annual estimate. It unlocks impact calculation. Next: ${nextAction}`
          : `Usa un estimado anual. Eso desbloquea el impacto. Siguiente: ${nextAction}`,
    };
  }

  if (q.includes("rol") || q.includes("role")) {
    return {
      source: "local",
      answer:
        lang === "en"
          ? `Role calibrates recommendations. Pick the role closest to your decision scope.`
          : `El rol calibra recomendaciones. Elige el rol mas cercano a tu alcance de decision.`,
    };
  }

  if (q.includes("resultado") || q.includes("result") || q.includes("score")) {
    return {
      source: "local",
      answer:
        lang === "en"
          ? `Focus on risk axis + annual impact. Then execute the first recommended action.`
          : `Enfocate en eje de riesgo + impacto anual. Luego ejecuta la primera accion recomendada.`,
    };
  }

  return {
    source: "local",
    answer:
      lang === "en"
        ? `Short answer: continue with this step first. Next: ${nextAction}.`
        : `Respuesta corta: primero completa este paso. Siguiente: ${nextAction}.`,
  };
}

async function callOpenAI(messages) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("missing_api_key");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        temperature: 0.45,
        max_tokens: 220,
        messages,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`http_${response.status}_${cleanText(errText, 120)}`);
    }

    const data = await response.json();
    return cleanText(data?.choices?.[0]?.message?.content || "", 1200);
  } finally {
    clearTimeout(timeout);
  }
}

async function nudgeWithAI(context, fallback) {
  const lang = context.lang === "en" ? "en" : "es";
  const systemPrompt = [
    "You are a neutral coaching assistant for a diagnostic test.",
    "Return strict JSON with keys: message, insight.",
    "Rules:",
    "- message max 65 chars.",
    "- insight max 105 chars.",
    "- insight must start with 'Siguiente:' (es) or 'Next:' (en).",
    "- never evaluate a specific answer as good/bad/high/low/right/wrong.",
    "- if step is quiz, only provide process guidance (last 90 days, frequency, next action).",
    "- if step is quiz, do not mention score, risk axis, or impact.",
    "- use concrete context tokens (role, nextAction, completion).",
    "- avoid generic filler, avoid markdown, avoid emojis.",
    "- language must match context.lang.",
  ].join("\n");

  const userPayload = {
    lang,
    step: cleanText(context.step || "", 20),
    triggerType: cleanText(context.triggerType || "progress", 20),
    roleLabel: cleanText(context.roleLabel || "", 40),
    biasGuard: Boolean(context.biasGuard),
    questionContext: context.questionContext || null,
    responseLatencyMs: Number(context.responseLatencyMs || 0),
    riskAxes: Array.isArray(context.riskAxes) ? context.riskAxes.slice(0, 3) : [],
    completionPct: Number(context.completionPct || 0),
    nextAction: cleanText(context.nextAction || "", 130),
    scenarios: context.scenarios || { base: 0, conservative: 0, aggressive: 0 },
    currency: context.currency || "USD",
  };

  try {
    const raw = await callOpenAI([
      { role: "system", content: systemPrompt },
      { role: "user", content: `Context JSON: ${JSON.stringify(userPayload)}` },
    ]);
    const parsed = extractJson(raw);
    if (!parsed) return { ...fallback, source: "local", reason: "invalid_json" };

    return {
      source: "openai",
      message: cleanText(parsed.message, 90) || fallback.message,
      insight: cleanText(parsed.insight, 150) || fallback.insight,
    };
  } catch (error) {
    return { ...fallback, source: "local", reason: cleanText(error.message, 90) };
  }
}

async function qaWithAI(context, fallback) {
  const lang = context.lang === "en" ? "en" : "es";
  const systemPrompt = [
    "You are a concise coaching assistant inside a diagnostic test.",
    "Answer user questions with short, actionable guidance.",
    "Return strict JSON with key: answer.",
    "Rules:",
    "- answer max 200 chars.",
    "- never choose an option for the user.",
    "- for quiz questions, provide a neutral decision rule (last 90 days + frequency).",
    "- do not infer diagnosis before the test is complete.",
    "- mention one concrete next action.",
    "- no markdown, no emojis, no lists.",
    "- language must match context.lang.",
  ].join("\n");

  const userPayload = {
    lang,
    question: cleanText(context.question || "", 240),
    step: cleanText(context.step || "", 20),
    biasGuard: Boolean(context.biasGuard),
    questionContext: context.questionContext || null,
    nextAction: cleanText(context.nextAction || "", 130),
    roleLabel: cleanText(context.roleLabel || "", 40),
    riskAxes: Array.isArray(context.riskAxes) ? context.riskAxes.slice(0, 3) : [],
    impactBase: Number(context?.scenarios?.base || 0),
    currency: context.currency || "USD",
  };

  try {
    const raw = await callOpenAI([
      { role: "system", content: systemPrompt },
      { role: "user", content: `Context JSON: ${JSON.stringify(userPayload)}` },
    ]);
    const parsed = extractJson(raw);
    if (!parsed) return { ...fallback, source: "local", reason: "invalid_json" };

    return {
      source: "openai",
      answer: cleanText(parsed.answer, 260) || fallback.answer,
    };
  } catch (error) {
    return { ...fallback, source: "local", reason: cleanText(error.message, 90) };
  }
}

exports.handler = async function handler(event) {
  if (event.httpMethod === "OPTIONS") return json(204, {});
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

  const context = parseJsonBody(event.body);
  const mode = cleanText(context.mode || "nudge", 10);

  if (mode === "qa") {
    const fallback = buildQAFallback(context);
    const result = await qaWithAI(context, fallback);
    return json(200, result);
  }

  const fallback = buildNudgeFallback(context);
  const result = await nudgeWithAI(context, fallback);
  return json(200, result);
};
