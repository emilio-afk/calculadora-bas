const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const REQUEST_TIMEOUT_MS = Number(process.env.AI_AGENT_TIMEOUT_MS || 5000);

const FALLBACK_COPY = {
  es: {
    steps: {
      default: "Copilot activo.",
      cal_1: "Buen inicio.",
      cal_2: "Este dato define el impacto.",
      cal_3: "Vas avanzando bien.",
      cal_4: "Estas cerrando contexto.",
      cal_review: "Listo para confirmar.",
      quiz: "Mantente en modo realidad.",
      lead: "Un paso mas para desbloquear.",
      results: "Diagnostico final listo.",
    },
    insights: {
      default: "Sigue con el siguiente paso.",
      revenueMissing: "Usa un estimado.",
      riskPrefix: "Riesgo principal:",
      impactPrefix: "Impacto estimado:",
      hesitationPrefix: "No te frenes ahora,",
      milestonePrefix: "Buen avance,",
      leadPrefix: "Estas a un paso,",
    },
    chips: {
      conservative: "Conservador",
      base: "Base",
      aggressive: "Acelerado",
    },
  },
  en: {
    steps: {
      default: "Copilot active.",
      cal_1: "Strong start.",
      cal_2: "This input unlocks impact.",
      cal_3: "Good progress.",
      cal_4: "Context almost complete.",
      cal_review: "Ready to confirm.",
      quiz: "Stay in reality mode.",
      lead: "One step to unlock.",
      results: "Final diagnosis ready.",
    },
    insights: {
      default: "Keep moving to the next step.",
      revenueMissing: "Use an estimate.",
      riskPrefix: "Primary risk:",
      impactPrefix: "Estimated impact:",
      hesitationPrefix: "Do not stop now,",
      milestonePrefix: "Great progress,",
      leadPrefix: "One step left,",
    },
    chips: {
      conservative: "Conservative",
      base: "Base",
      aggressive: "Accelerated",
    },
  },
};

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

function cleanChipList(chips) {
  if (!Array.isArray(chips)) return [];
  return chips
    .map((chip) => cleanText(chip, 38))
    .filter(Boolean)
    .slice(0, 3);
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

function parseJsonBody(raw) {
  try {
    return JSON.parse(raw || "{}");
  } catch (error) {
    return {};
  }
}

function withNextPrefix(lang, text) {
  const prefix = lang === "en" ? "Next:" : "Siguiente:";
  const cleaned = cleanText(text, 130);
  if (!cleaned) return prefix;
  if (cleaned.toLowerCase().startsWith(prefix.toLowerCase())) return cleaned;
  return `${prefix} ${cleaned}`;
}

function extractJson(text) {
  if (!text) return null;
  const trimmed = text.trim();
  const fenced = trimmed.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
  try {
    return JSON.parse(fenced);
  } catch (error) {
    const first = fenced.indexOf("{");
    const last = fenced.lastIndexOf("}");
    if (first === -1 || last === -1 || first >= last) return null;
    try {
      return JSON.parse(fenced.slice(first, last + 1));
    } catch (innerError) {
      return null;
    }
  }
}

function buildFallback(context) {
  const lang = context.lang === "en" ? "en" : "es";
  const pack = FALLBACK_COPY[lang];
  const step = cleanText(context.step || "default", 20);
  const triggerType = cleanText(context.triggerType || "progress", 20);
  const stepText = pack.steps[step] || pack.steps.default;
  const nextAction = cleanText(context.nextAction || "", 100);
  const roleLabel = cleanText(
    context.roleLabel || (lang === "en" ? "leader" : "lider"),
    32,
  );
  const completionPct = Number(context.completionPct || 0);

  let insight = withNextPrefix(lang, nextAction || pack.insights.default);
  let message = stepText;
  const base = Number(context?.scenarios?.base || 0);
  const topRisk = cleanText(
    context.topRiskAxis || (context.riskAxes && context.riskAxes[0]),
    28,
  );

  if (triggerType === "hesitation") {
    message = cleanText(`${pack.insights.hesitationPrefix} ${roleLabel}`, 110);
  } else if (triggerType === "milestone") {
    message = cleanText(
      `${pack.insights.milestonePrefix} ${completionPct}%`,
      110,
    );
  } else if (triggerType === "lead_push") {
    message = cleanText(`${pack.insights.leadPrefix} ${roleLabel}`, 110);
  } else if (triggerType === "risk" && topRisk) {
    message = cleanText(`${pack.insights.riskPrefix} ${topRisk}`, 110);
  }

  if (step === "cal_2" && Number(context.revenue || 0) <= 0) {
    insight = withNextPrefix(lang, pack.insights.revenueMissing);
  } else if (step === "results" && Number(context.impact || 0) > 0) {
    insight = withNextPrefix(
      lang,
      `${pack.insights.impactPrefix} ${money(context.impact, lang, context.currency)}.`,
    );
  } else if (topRisk) {
    insight = withNextPrefix(lang, `${pack.insights.riskPrefix} ${topRisk}.`);
  } else if (base > 0) {
    insight = withNextPrefix(
      lang,
      `${pack.chips.base}: ${money(base, lang, context.currency)}`,
    );
  }

  const chips = [];
  if (base > 0) {
    chips.push(
      `${pack.chips.conservative}: ${money(context?.scenarios?.conservative || 0, lang, context.currency)}`,
      `${pack.chips.base}: ${money(base, lang, context.currency)}`,
      `${pack.chips.aggressive}: ${money(context?.scenarios?.aggressive || 0, lang, context.currency)}`,
    );
  }

  return {
    message: cleanText(message, 110),
    insight: cleanText(insight, 150),
    chips: cleanChipList(chips),
  };
}

async function requestOpenAI(context, fallback) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { ...fallback, source: "local", reason: "missing_api_key" };
  }

  const lang = context.lang === "en" ? "en" : "es";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const systemPrompt = [
    "You are BAS Copilot for a business calculator focused on conversion nudges.",
    "Return strict JSON only with keys: message, insight, chips.",
    "Rules:",
    "- message <= 70 chars and emotionally energizing but professional.",
    "- message must feel personal based on role, progress, risk, or trigger.",
    "- insight <= 110 chars and must be one concrete next action.",
    "- insight must start with 'Siguiente:' for es or 'Next:' for en.",
    "- mention at least one concrete token from context: nextAction, risk axis, currency amount, roleLabel, or completionPct.",
    "- chips must be 0-3 short strings, each <= 28 chars.",
    "- no markdown, no emojis, no line breaks.",
    "- avoid vague text, avoid generic cliches.",
    "- language must match context.lang.",
  ].join("\n");

  const userPayload = {
    lang,
    step: context.step || "default",
    triggerType: cleanText(context.triggerType || "progress", 20),
    nextAction: cleanText(context.nextAction || "", 100),
    roleLabel: cleanText(context.roleLabel || "", 32),
    scopeLabel: cleanText(context.scopeLabel || "", 32),
    scope: context.scope || null,
    role: context.role || null,
    revenue: Number(context.revenue || 0),
    currency: context.currency || "USD",
    completionPct: Number(context.completionPct || 0),
    intentScore: Number(context.intentScore || 0),
    riskAxes: Array.isArray(context.riskAxes) ? context.riskAxes.slice(0, 3) : [],
    scenarios: context.scenarios || { conservative: 0, base: 0, aggressive: 0 },
    score: Number(context.score || 0),
    impact: Number(context.impact || 0),
    topRiskAxis: context.topRiskAxis || null,
  };

  try {
    const response = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        temperature: 0.35,
        max_tokens: 180,
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Context JSON: ${JSON.stringify(userPayload)}`,
          },
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errText = await response.text();
      return {
        ...fallback,
        source: "local",
        reason: `api_error_${response.status}`,
        error: cleanText(errText, 120),
      };
    }

    const data = await response.json();
    const rawContent = data?.choices?.[0]?.message?.content || "";
    const parsed = extractJson(rawContent);
    if (!parsed) return { ...fallback, source: "local", reason: "invalid_json" };

    const prefixedInsight = withNextPrefix(lang, parsed.insight || "");

    return {
      source: "openai",
      message: cleanText(parsed.message, 110) || fallback.message,
      insight: cleanText(prefixedInsight, 150) || fallback.insight,
      chips: cleanChipList(parsed.chips),
    };
  } catch (error) {
    const reason = error && error.name === "AbortError" ? "timeout" : "request_failed";
    return { ...fallback, source: "local", reason };
  } finally {
    clearTimeout(timeout);
  }
}

exports.handler = async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return json(204, {});
  }
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const context = parseJsonBody(event.body);
  const fallback = buildFallback(context);
  const result = await requestOpenAI(context, fallback);

  return json(200, result);
};
