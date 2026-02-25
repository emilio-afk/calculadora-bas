const EJES = [
  {
    id: "estrategia",
    name: "Estrategia",
    name_en: "Strategy",
    icon: "🗺️",
    meta: "El plano urbano",
    meta_en: "The city blueprint",
    color: "#0A56C6",
  },
  {
    id: "gobernanza",
    name: "Gobernanza",
    name_en: "Governance",
    icon: "🚦",
    meta: "Los semáforos",
    meta_en: "The traffic lights",
    color: "#0E9F6E",
  },
  {
    id: "rituales",
    name: "Rituales",
    name_en: "Rituals",
    icon: "🛣️",
    meta: "Las avenidas",
    meta_en: "The avenues",
    color: "#D97706",
  },
  {
    id: "accountability",
    name: "Accountability",
    name_en: "Accountability",
    icon: "🏗️",
    meta: "La señalización",
    meta_en: "The signage",
    color: "#334155",
  },
  {
    id: "narrativa",
    name: "Narrativa",
    name_en: "Narrative",
    icon: "📢",
    meta: "El idioma",
    meta_en: "The shared language",
    color: "#2563EB",
  },
];

const CONTEXT_QS = [
  {
    id: "tam_directivo",
    q: "¿Cuántas personas tiene tu equipo directivo (los que te reportan directo)?",
    q_en: "How many people are in your leadership team (your direct reports)?",
    opts: [
      { label: "3–5", label_en: "3–5", val: 4 },
      { label: "6–8", label_en: "6–8", val: 7 },
      { label: "9–12", label_en: "9–12", val: 10 },
      { label: "Más de 12", label_en: "More than 12", val: 14 },
    ],
  },
  {
    id: "tam_org",
    q: "¿Cuántas personas tiene tu organización en total?",
    q_en: "How many people are in your organization in total?",
    opts: [
      { label: "Menos de 30", label_en: "Less than 30", val: 25 },
      { label: "30–80", label_en: "30–80", val: 55 },
      { label: "80–200", label_en: "80–200", val: 140 },
      { label: "Más de 200", label_en: "More than 200", val: 300 },
    ],
  },
  {
    id: "ingreso",
    q: "¿Cuál es el ingreso anual aproximado de tu empresa?",
    q_en: "What is your company's approximate annual revenue?",
    opts: [
      {
        label: "Menos de $20M MXN",
        label_en: "Less than $20M MXN",
        val: 15e6,
      },
      { label: "$20–80M MXN", label_en: "$20–80M MXN", val: 50e6 },
      { label: "$80–300M MXN", label_en: "$80–300M MXN", val: 180e6 },
      {
        label: "Más de $300M MXN",
        label_en: "More than $300M MXN",
        val: 500e6,
      },
    ],
  },
  {
    id: "costo_hora",
    q: "¿Cuánto estimas que cuesta la hora promedio de un miembro de tu equipo directivo? (sueldo + prestaciones)",
    q_en: "How much do you estimate the average hour of a leadership team member costs? (salary + benefits)",
    opts: [
      { label: "$300–500 MXN", label_en: "$300–500 MXN", val: 400 },
      { label: "$500–800 MXN", label_en: "$500–800 MXN", val: 650 },
      {
        label: "$800–1,200 MXN",
        label_en: "$800–1,200 MXN",
        val: 1000,
      },
      {
        label: "Más de $1,200 MXN",
        label_en: "More than $1,200 MXN",
        val: 1500,
      },
    ],
  },
];

const DIAG_QS = [
  {
    eje: "estrategia",
    q: "¿Cuántas prioridades estratégicas tiene tu equipo directivo abiertas en este momento?",
    q_en: "How many strategic priorities does your leadership team currently have open?",
    opts: [
      { label: "1–3", label_en: "1–3", pts: 25 },
      { label: "4–6", label_en: "4–6", pts: 15 },
      { label: "7–10", label_en: "7–10", pts: 8 },
      { label: "Más de 10", label_en: "More than 10", pts: 0 },
    ],
    fricVal: [3, 5, 8, 12],
  },
  {
    eje: "estrategia",
    q: 'Si le preguntas a cada miembro de tu equipo "¿cuáles son las 3 prioridades?", ¿cuántos darían la misma respuesta?',
    q_en: "If you ask each member of your team 'what are the top 3 priorities?', how many would give the same answer?",
    opts: [
      { label: "Todos", label_en: "All", pts: 25 },
      { label: "La mayoría", label_en: "Most", pts: 15 },
      { label: "Algunos", label_en: "Some", pts: 8 },
      { label: "Nadie", label_en: "None", pts: 0 },
    ],
  },
  {
    eje: "estrategia",
    q: "¿Cada cuánto se revisa y ajusta la estrategia como equipo directivo?",
    q_en: "How often is strategy reviewed and adjusted as a leadership team?",
    opts: [
      {
        label: "Cada 90 días con rigor",
        label_en: "Every 90 days with discipline",
        pts: 25,
      },
      { label: "Cada 6 meses", label_en: "Every 6 months", pts: 15 },
      { label: "Una vez al año", label_en: "Once a year", pts: 8 },
      { label: "Cuando hay crisis", label_en: "Only during crises", pts: 0 },
    ],
  },
  {
    eje: "estrategia",
    q: "En los últimos 6 meses, ¿cuántas iniciativas estratégicas se iniciaron pero no se terminaron?",
    q_en: "In the last 6 months, how many strategic initiatives were started but not finished?",
    opts: [
      { label: "0–1", label_en: "0–1", pts: 25 },
      { label: "2–3", label_en: "2–3", pts: 15 },
      { label: "4–6", label_en: "4–6", pts: 8 },
      { label: "Más de 6", label_en: "More than 6", pts: 0 },
    ],
    fricVal: [0.5, 2.5, 5, 8],
  },
  {
    eje: "gobernanza",
    q: "¿Cuántas decisiones por semana suben a tu escritorio que podría estar tomando alguien más?",
    q_en: "How many decisions per week escalate to your desk that someone else could make?",
    opts: [
      { label: "0–2", label_en: "0–2", pts: 25 },
      { label: "3–5", label_en: "3–5", pts: 15 },
      { label: "6–10", label_en: "6–10", pts: 8 },
      { label: "Más de 10", label_en: "More than 10", pts: 0 },
    ],
    fricVal: [1, 4, 8, 13],
  },
  {
    eje: "gobernanza",
    q: "Cuando dos áreas no se ponen de acuerdo, ¿qué pasa normalmente?",
    q_en: "When two areas disagree, what usually happens?",
    opts: [
      {
        label: "Lo resuelven con criterios claros",
        label_en: "They solve it with clear criteria",
        pts: 25,
      },
      {
        label: "Sube a un tercero definido",
        label_en: "It escalates to a defined third party",
        pts: 15,
      },
      { label: "Sube a ti", label_en: "It escalates to you", pts: 8 },
      {
        label: "Se estanca hasta que alguien explota",
        label_en: "It stalls until someone explodes",
        pts: 0,
      },
    ],
  },
  {
    eje: "gobernanza",
    q: "¿Existe un acuerdo explícito de quién decide qué en tu equipo directivo?",
    q_en: "Is there an explicit agreement on who decides what in your leadership team?",
    opts: [
      {
        label: "Sí, claro y se respeta",
        label_en: "Yes, clear and respected",
        pts: 25,
      },
      {
        label: "Existe pero no siempre se respeta",
        label_en: "It exists but is not always respected",
        pts: 15,
      },
      { label: "Es implícito", label_en: "It is implicit", pts: 8 },
      { label: "No existe", label_en: "It does not exist", pts: 0 },
    ],
  },
  {
    eje: "gobernanza",
    q: "¿Con qué frecuencia se re-discute una decisión que ya se había tomado?",
    q_en: "How often is a decision revisited after it was already made?",
    opts: [
      { label: "Casi nunca", label_en: "Almost never", pts: 25 },
      { label: "Ocasionalmente", label_en: "Occasionally", pts: 15 },
      { label: "Frecuentemente", label_en: "Frequently", pts: 8 },
      { label: "Constantemente", label_en: "Constantly", pts: 0 },
    ],
    fricVal: [0.5, 2, 4, 7],
  },
  {
    eje: "rituales",
    q: "¿Cuántas juntas recurrentes tienes en tu agenda por semana?",
    q_en: "How many recurring meetings do you have on your calendar each week?",
    opts: [
      { label: "0–4", label_en: "0–4", pts: 25 },
      { label: "5–8", label_en: "5–8", pts: 15 },
      { label: "9–12", label_en: "9–12", pts: 8 },
      { label: "Más de 12", label_en: "More than 12", pts: 0 },
    ],
    fricVal: [3, 6.5, 10.5, 15],
  },
  {
    eje: "rituales",
    q: "¿Cuántas personas asisten en promedio a tus juntas?",
    q_en: "How many people attend your meetings on average?",
    opts: [
      { label: "2–4", label_en: "2–4", pts: 25 },
      { label: "5–7", label_en: "5–7", pts: 15 },
      { label: "8–10", label_en: "8–10", pts: 8 },
      { label: "Más de 10", label_en: "More than 10", pts: 0 },
    ],
    fricVal: [3, 6, 9, 12],
  },
  {
    eje: "rituales",
    q: "De tus juntas recurrentes, ¿en qué porcentaje se toman decisiones firmes con responsable y fecha?",
    q_en: "Of your recurring meetings, in what percentage are firm decisions made with owner and deadline?",
    opts: [
      { label: "Más del 80%", label_en: "More than 80%", pts: 25 },
      { label: "50–80%", label_en: "50–80%", pts: 15 },
      { label: "20–50%", label_en: "20–50%", pts: 8 },
      { label: "Menos del 20%", label_en: "Less than 20%", pts: 0 },
    ],
    fricVal: [0.15, 0.35, 0.65, 0.85],
  },
  {
    eje: "rituales",
    q: '¿Con qué frecuencia sales de una junta pensando "esto se pudo resolver con un correo"?',
    q_en: "How often do you leave a meeting thinking 'this could have been solved by email'?",
    opts: [
      { label: "Casi nunca", label_en: "Almost never", pts: 25 },
      { label: "A veces", label_en: "Sometimes", pts: 15 },
      { label: "Frecuentemente", label_en: "Frequently", pts: 8 },
      {
        label: "La mayoría de las veces",
        label_en: "Most of the time",
        pts: 0,
      },
    ],
  },
  {
    eje: "accountability",
    q: "¿Cuántas veces al mes tienes que intervenir personalmente para que algo que ya se acordó se cumpla?",
    q_en: "How many times per month do you have to intervene personally to ensure agreed actions are executed?",
    opts: [
      { label: "0–2", label_en: "0–2", pts: 25 },
      { label: "3–5", label_en: "3–5", pts: 15 },
      { label: "6–10", label_en: "6–10", pts: 8 },
      { label: "Más de 10", label_en: "More than 10", pts: 0 },
    ],
    fricVal: [1, 4, 8, 13],
  },
  {
    eje: "accountability",
    q: "Cuando un proyecto se atrasa, ¿quién responde?",
    q_en: "When a project is delayed, who takes responsibility?",
    opts: [
      {
        label: "El dueño claro del proyecto",
        label_en: "The clear owner of the project",
        pts: 25,
      },
      {
        label: "El líder del área lo absorbe",
        label_en: "The area leader absorbs it",
        pts: 15,
      },
      { label: "Sube a ti", label_en: "It escalates to you", pts: 8 },
      {
        label: "Se diluye, nadie claramente",
        label_en: "It gets diluted, no one clearly",
        pts: 0,
      },
    ],
  },
  {
    eje: "accountability",
    q: "¿Cada miembro de tu equipo directivo tiene metas claras con dueño, métrica y fecha?",
    q_en: "Does each member of your leadership team have clear goals with owner, metric, and deadline?",
    opts: [
      { label: "Sí, todos", label_en: "Yes, everyone", pts: 25 },
      { label: "La mayoría", label_en: "Most", pts: 15 },
      { label: "Algunos", label_en: "Some", pts: 8 },
      {
        label: "Las metas son del equipo en general",
        label_en: "Goals are for the team in general",
        pts: 0,
      },
    ],
  },
  {
    eje: "accountability",
    q: "¿Con qué frecuencia sientes que las mismas conversaciones se repiten porque nadie cerró el tema?",
    q_en: "How often do you feel the same conversations repeat because nobody closed the topic?",
    opts: [
      { label: "Casi nunca", label_en: "Almost never", pts: 25 },
      { label: "Ocasionalmente", label_en: "Occasionally", pts: 15 },
      { label: "Frecuentemente", label_en: "Frequently", pts: 8 },
      { label: "Es lo normal aquí", label_en: "This is normal here", pts: 0 },
    ],
    fricVal: [0.5, 2, 4, 6],
  },
  {
    eje: "narrativa",
    q: 'Si le preguntas a alguien de operaciones y a alguien de ventas "¿qué es lo más importante para la empresa ahora?", ¿qué tan parecidas serían sus respuestas?',
    q_en: "If you ask someone from operations and someone from sales 'what is most important for the company now?', how similar would their answers be?",
    opts: [
      {
        label: "Prácticamente iguales",
        label_en: "Practically identical",
        pts: 25,
      },
      {
        label: "Similares en lo general",
        label_en: "Similar at a high level",
        pts: 15,
      },
      {
        label: "Bastante diferentes",
        label_en: "Quite different",
        pts: 8,
      },
      {
        label: "Completamente distintas",
        label_en: "Completely different",
        pts: 0,
      },
    ],
  },
  {
    eje: "narrativa",
    q: "Cuando comunicas una decisión estratégica, ¿cuántas veces tienes que re-explicarla antes de que se ejecute?",
    q_en: "When you communicate a strategic decision, how many times do you need to re-explain it before execution happens?",
    opts: [
      { label: "1 vez basta", label_en: "Once is enough", pts: 25 },
      { label: "2 veces", label_en: "Twice", pts: 15 },
      { label: "3+ veces", label_en: "3+ times", pts: 8 },
      {
        label: "Nunca queda claro del todo",
        label_en: "It never becomes fully clear",
        pts: 0,
      },
    ],
    fricVal: [0, 1, 3, 5],
  },
  {
    eje: "narrativa",
    q: "¿Tu equipo tiene un lenguaje compartido para hablar de las prioridades? (mismos nombres, métricas, plazos)",
    q_en: "Does your team share a common language to discuss priorities? (same names, metrics, timelines)",
    opts: [
      { label: "Sí, consistente", label_en: "Yes, consistent", pts: 25 },
      { label: "Más o menos", label_en: "More or less", pts: 15 },
      {
        label: "Cada área usa sus términos",
        label_en: "Each area uses its own terms",
        pts: 8,
      },
      { label: "No hay lenguaje común", label_en: "No shared language", pts: 0 },
    ],
  },
  {
    eje: "narrativa",
    q: "Si mañana entra un director nuevo, ¿existe algo escrito donde pueda entender cómo funciona este equipo?",
    q_en: "If a new director joins tomorrow, is there written documentation so they can understand how this team operates?",
    opts: [
      {
        label: "Sí, un documento claro",
        label_en: "Yes, a clear document",
        pts: 25,
      },
      { label: "Hay cosas dispersas", label_en: "There are scattered pieces", pts: 15 },
      {
        label: "Tendría que preguntar mucho",
        label_en: "They would need to ask a lot",
        pts: 8,
      },
      { label: "Aprendería sobre la marcha", label_en: "They would learn on the fly", pts: 0 },
    ],
  },
];

const ALL_QS = [
  ...CONTEXT_QS.map((q, i) => ({ ...q, type: "ctx", idx: i })),
  ...DIAG_QS.map((q, i) => ({ ...q, type: "diag", idx: i })),
];

const UI = {
  es: {
    brandKicker: "DIAGNOSTICO EXPRESS",
    introTitle: "Descubre el 'Freno Invisible'",
    introTitleSupport: "que está costando miles de dólares a tu equipo cada mes.",
    introSubtitle:
      "La pérdida de tiempo no siempre es evidente, pero siempre tiene un costo. Este quiz te muestra dónde se está yendo el tiempo y cómo recuperarlo desde hoy.",
    start: "REVELA TU RESULTADO",
    privacy: "No pedimos email. Tu resultado es privado.",
    introKickerTop: "Diagnóstico express para líderes de equipo",
    timeEst: "4 minutos, resultado inmediato.",
    deliverable: "Entregable: reporte PDF.",
    privacyDetail: "Privacidad: datos seguros.",
    introStat1Value: "120+",
    introStat1Label: "Líderes evaluados",
    introStat2Value: "35",
    introStat2Label: "Empresas B2B",
    introQuote: '"Muy accionable desde la primera conversación."',
    introQuoteBy: "Director General · Manufactura",
    introTrustBadge: "Diagnóstico confiable",
    contextLabel: "SOBRE TU EMPRESA",
    skipToMain: "Saltar al contenido",
    langToggleAria: "Cambiar idioma",
    progressLabel: "Progreso del cuestionario",
    liveIntro: "Pantalla de introduccion del quiz.",
    liveQuestion: "Pregunta",
    liveOf: "de",
    liveResults: "Vista de resultados",
    resultsNavLabel: "Secciones de resultados",
    crumbNavLabel: "Ruta de navegacion",
    crumbHome: "Inicio",
    crumbQuiz: "Diagnóstico",
    crumbQuestions: "Preguntas",
    crumbResults: "Resultados",
    tabLevel: "Tu nivel",
    tabAxes: "5 ejes",
    tabImpact: "Impacto",
    scoreAverage: "Score promedio",
    levelTitle: "Tu sistema operativo está en:",
    axisNote: "⚠️ = Eje crítico (donde más capacidad se desperdicia)",
    impactTitle: "Capacidad directiva atrapada en coordinación improductiva:",
    impactExplainer:
      "No es dinero que pierdes. Es el valor del tiempo que tu equipo directivo invierte en coordinación improductiva en vez de ejecución estratégica.",
    impactPct: "de tu ingreso anual",
    top2Prefix: "El",
    top2Middle:
      "de esa capacidad atrapada está en",
    top2Suffix: "No hay que arreglar todo. Hay que liberar eso.",
    investTextPrefix: "Si rediseñar esto cuesta $150K MXN, es el",
    investTextSuffix:
      "de la capacidad que recuperas cada año para lo que realmente importa.",
    viewAxis: "Ver detalle por eje",
    viewImpact: "Ver el impacto en tu negocio",
    schedule: "Agenda tu diagnóstico 1:1",
    restart: "Volver a empezar",
    prev: "← Anterior",
    critTag: "CRÍTICO",
    levelTag: "NIVEL",
    ytd: "año",
    axisModalKicker: "Guia rapida del eje",
    axisModalCta: "Entendido, continuar",
    axisStepperTitle: "Mapa de los 5 ejes",
    levelHoverHint:
      "Tip: pasa el cursor (o toca en movil) sobre cada nivel para ver su descripcion.",
    cityAnalogyLabel: "Como se traduce este nivel en tu empresa",
    leadGateTitle: "Desbloquea 5 ejes e impacto",
    leadGateSubtitle:
      "Comparte tu nombre y correo para mostrar el detalle completo y enviarte el reporte.",
    leadNamePh: "Nombre completo",
    leadEmailPh: "Correo profesional",
    leadCompanyPh: "Empresa (opcional)",
    leadNameLabel: "Nombre completo",
    leadEmailLabel: "Correo profesional",
    leadCompanyLabel: "Empresa (opcional)",
    leadGateCancel: "Ahora no",
    leadGateSubmit: "Desbloquear",
    leadGateError: "Ingresa un nombre y un correo valido.",
    downloadPdf: "Descargar PDF",
    detailsLockedTab: "Bloqueado",
  },
  en: {
    brandKicker: "EXPRESS DIAGNOSTIC",
    introTitle: "Find the 'Invisible Brake'",
    introTitleSupport: "that is costing your team thousands of dollars every month.",
    introSubtitle:
      "Time loss is not always obvious, but it always has a cost. This quiz shows where time is leaking and how to recover it now.",
    start: "REVEAL YOUR RESULT",
    privacy: "No email required. Your result is private.",
    introKickerTop: "Express diagnostic for team leaders",
    timeEst: "4 minutes, immediate result.",
    deliverable: "Deliverable: PDF report.",
    privacyDetail: "Privacy: secure data.",
    introStat1Value: "120+",
    introStat1Label: "Leaders assessed",
    introStat2Value: "35",
    introStat2Label: "B2B companies",
    introQuote: '"Highly actionable from the first conversation."',
    introQuoteBy: "CEO · Manufacturing",
    introTrustBadge: "Trusted diagnostic",
    contextLabel: "ABOUT YOUR COMPANY",
    skipToMain: "Skip to main content",
    langToggleAria: "Switch language",
    progressLabel: "Quiz progress",
    liveIntro: "Quiz introduction screen.",
    liveQuestion: "Question",
    liveOf: "of",
    liveResults: "Results view",
    resultsNavLabel: "Results sections",
    crumbNavLabel: "Breadcrumb navigation",
    crumbHome: "Home",
    crumbQuiz: "Diagnostic",
    crumbQuestions: "Questions",
    crumbResults: "Results",
    tabLevel: "Your level",
    tabAxes: "5 axes",
    tabImpact: "Impact",
    scoreAverage: "Average score",
    levelTitle: "Your operating system is at:",
    axisNote: "⚠️ = Critical axis (where the most capacity is wasted)",
    impactTitle: "Leadership capacity trapped in unproductive coordination:",
    impactExplainer:
      "This is not cash you directly lose. It is the value of leadership time spent on unproductive coordination instead of strategic execution.",
    impactPct: "of your annual revenue",
    top2Prefix: "The",
    top2Middle:
      "of that trapped capacity is in",
    top2Suffix: "You do not need to fix everything. You need to unlock that.",
    investTextPrefix: "If redesigning this costs $150K MXN, that is",
    investTextSuffix:
      "of the capacity you recover each year for what really matters.",
    viewAxis: "See axis detail",
    viewImpact: "See business impact",
    schedule: "Book your 1:1 diagnostic",
    restart: "Start again",
    prev: "← Back",
    critTag: "CRITICAL",
    levelTag: "LEVEL",
    ytd: "year",
    axisModalKicker: "Quick axis guide",
    axisModalCta: "Got it, continue",
    axisStepperTitle: "5-axis map",
    levelHoverHint:
      "Tip: hover (or tap on mobile) each level to view its description.",
    cityAnalogyLabel: "How this city translates to your company",
    leadGateTitle: "Unlock 5 axes and impact",
    leadGateSubtitle:
      "Share your name and email to show full detail and send your report.",
    leadNamePh: "Full name",
    leadEmailPh: "Work email",
    leadCompanyPh: "Company (optional)",
    leadNameLabel: "Full name",
    leadEmailLabel: "Work email",
    leadCompanyLabel: "Company (optional)",
    leadGateCancel: "Not now",
    leadGateSubmit: "Unlock",
    leadGateError: "Enter a name and a valid email.",
    downloadPdf: "Download PDF",
    detailsLockedTab: "Locked",
  },
};

function fmt(n) {
  return n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : `$${Math.round(n / 1000)}K`;
}

function fmtFull(n) {
  return "$" + Math.round(n).toLocaleString("es-MX");
}

function getCityLevel(avg, scores) {
  const below30 = Object.values(scores).filter((s) => s < 30).length;
  const above50 = Object.values(scores).filter((s) => s > 50).length;
  const between30and60 = Object.values(scores).filter(
    (s) => s >= 30 && s <= 60,
  ).length;
  if (avg > 65 && below30 === 0) return 4;
  if (avg > 50 && below30 >= 2) return 3;
  if (avg <= 25 || above50 === 0) return 1;
  if (avg <= 45 || above50 <= 2) return 2;
  if (between30and60 >= 3) return 3;
  return 3;
}

const CITY = {
  1: {
    name: "Campamento",
    name_en: "Camp",
    color: "#7F8C8D",
    phrase: "Todo pasa por ti. Si te detienes, todo se detiene.",
    phrase_en: "Everything goes through you. If you stop, everything stops.",
    analogy:
      "La empresa opera como un campamento: la coordinacion depende de una sola persona y la autonomia real es baja.",
    analogy_en:
      "The company works like a camp: coordination depends on one person and real autonomy is low.",
    bldgs: [0.3, 0.45, 0.35],
  },
  2: {
    name: "Pueblo",
    name_en: "Town",
    color: "#D4873F",
    phrase: "Estas creciendo, pero la coordinacion es fragil.",
    phrase_en: "You are growing, but coordination is fragile.",
    analogy:
      "La empresa ya crecio, pero funciona como pueblo: hay estructura, aunque muchos acuerdos siguen dependiendo de relaciones personales.",
    analogy_en:
      "The company has grown, but it behaves like a town: there is structure, yet many agreements still depend on personal relationships.",
    bldgs: [0.5, 0.65, 0.55, 0.7],
  },
  3: {
    name: "Ciudad Congestionada",
    name_en: "Congested City",
    color: "#B93D3D",
    phrase: "Hay resultados, pero el desgaste es invisible y constante.",
    phrase_en: "There are results, but the wear is invisible and constant.",
    analogy:
      "La empresa es una ciudad congestionada: hay capacidad y talento, pero se fuga energia en friccion, retrabajo y coordinacion lenta.",
    analogy_en:
      "The company is a congested city: there is capacity and talent, but energy leaks through friction, rework, and slow coordination.",
    bldgs: [0.7, 0.55, 0.9, 0.65, 0.8, 0.5],
  },
  4: {
    name: "Ciudad con Sistema",
    name_en: "System City",
    color: "#1ABC9C",
    phrase: "Tu equipo ejecuta con claridad. El sistema absorbe la complejidad.",
    phrase_en:
      "Your team executes with clarity. The system absorbs complexity.",
    analogy:
      "La empresa funciona como ciudad con sistema: reglas claras, decisiones distribuidas y rituales que convierten estrategia en ejecucion.",
    analogy_en:
      "The company works like a system city: clear rules, distributed decisions, and rituals that turn strategy into execution.",
    bldgs: [0.7, 0.9, 0.8, 0.65],
  },
};

const DIAG_PHRASES = {
  estrategia: {
    0: "No hay plano urbano. Cada area construye por su cuenta.",
    25: "No hay plano urbano. Cada area construye por su cuenta.",
    50: "Demasiadas prioridades abiertas. El mapa existe pero nadie lo sigue.",
    75: "Hay direccion clara pero falta ritmo de revision.",
    100: "Estrategia enfocada y compartida.",
  },
  gobernanza: {
    0: "Tu eres el semaforo. Todas las decisiones pasan por ti.",
    25: "Tu eres el semaforo. Todas las decisiones pasan por ti.",
    50: "Semaforos desincronizados. Las decisiones rebotan entre areas.",
    75: "Hay estructura pero se bypasea con frecuencia.",
    100: "Las decisiones ocurren donde vive la informacion.",
  },
  rituales: {
    0: "Juntitis cronica. Muchas horas en sala, pocas decisiones.",
    25: "Juntitis cronica. Muchas horas en sala, pocas decisiones.",
    50: "Trafico: demasiadas juntas sin resultado claro.",
    75: "Hay rituales pero no todos producen valor.",
    100: "Las juntas correctas, con la gente correcta.",
  },
  accountability: {
    0: "Nadie es dueno de nada. Todo depende de que tu empujes.",
    25: "Nadie es dueno de nada. Todo depende de que tu empujes.",
    50: "Todos estan en todo, pero nadie es responsable de nada especifico.",
    75: "Hay duenos pero el seguimiento es inconsistente.",
    100: "Duenos reales con autonomia y criterio.",
  },
  narrativa: {
    0: "Cada area habla su propio idioma. No hay historia compartida.",
    25: "Cada area habla su propio idioma. No hay historia compartida.",
    50: "Existe una narrativa pero no llega igual a todos.",
    75: "El equipo directivo esta alineado pero no permea.",
    100: "Narrativa compartida que funciona como criterio de decision.",
  },
};

const DIAG_PHRASES_EN = {
  estrategia: {
    0: "No city blueprint. Each area builds on its own.",
    25: "No city blueprint. Each area builds on its own.",
    50: "Too many open priorities. The map exists but nobody follows it.",
    75: "There is direction, but review cadence is weak.",
    100: "Focused and shared strategy.",
  },
  gobernanza: {
    0: "You are the traffic light. All decisions pass through you.",
    25: "You are the traffic light. All decisions pass through you.",
    50: "Traffic lights are misaligned. Decisions bounce between areas.",
    75: "There is structure, but it gets bypassed often.",
    100: "Decisions happen where information lives.",
  },
  rituales: {
    0: "Chronic meeting overload. Many hours, few decisions.",
    25: "Chronic meeting overload. Many hours, few decisions.",
    50: "Traffic jam: too many meetings without clear outcomes.",
    75: "Rituals exist, but not all create value.",
    100: "The right meetings with the right people.",
  },
  accountability: {
    0: "Nobody owns anything. Everything depends on your push.",
    25: "Nobody owns anything. Everything depends on your push.",
    50: "Everyone is in everything, but no one owns specifics.",
    75: "Owners exist, but follow-through is inconsistent.",
    100: "Real owners with autonomy and judgment.",
  },
  narrativa: {
    0: "Each area speaks its own language. No shared story.",
    25: "Each area speaks its own language. No shared story.",
    50: "A narrative exists but does not land equally.",
    75: "Leadership is aligned but it does not cascade.",
    100: "Shared narrative that guides decisions.",
  },
};

const state = {
  lang: "es",
  step: -1,
  answers: {},
  ctxAnswers: {},
  showResult: false,
  resultTab: 0,
  axisTipsSeen: {},
  axisModal: null,
  lead: {
    submitted: false,
    modalOpen: false,
    targetTab: 1,
    name: "",
    email: "",
    company: "",
    error: "",
    errorField: "",
  },
};

let navTimer = null;
let nextHistoryMode = "replace";
let isApplyingPopState = false;
let lastSyncedRoute = "";
const analytics = {
  city: "N/A",
  country: "N/A",
  deviceType: /Mobi|Android|iPhone/i.test(navigator.userAgent)
    ? "Móvil"
    : "Desktop",
  lastStep: "intro",
  hasStarted: false,
  hasFinalSubmit: false,
};

const AXIS_EXPLAIN = {
  estrategia: {
    es: "Este eje evalua foco y prioridades compartidas. Si falla, cada area persigue cosas distintas y se diluye la ejecucion.",
    en: "This axis evaluates shared focus and priorities. If it fails, each area pursues different things and execution gets diluted.",
  },
  gobernanza: {
    es: "Este eje evalua como se decide y quien decide. Si no hay reglas claras, todo escala, se retrasa y se re-discute.",
    en: "This axis evaluates how decisions are made and who makes them. Without clear rules, everything escalates, slows down, and gets re-discussed.",
  },
  rituales: {
    es: "Este eje evalua la calidad de juntas y rutinas de coordinacion. El objetivo es menos reunion improductiva y mas decisiones accionables.",
    en: "This axis evaluates the quality of meetings and coordination routines. The goal is fewer unproductive meetings and more actionable decisions.",
  },
  accountability: {
    es: "Este eje evalua propiedad real y seguimiento. Cuando falla, los compromisos se diluyen y todo depende de empuje manual.",
    en: "This axis evaluates real ownership and follow-through. When it fails, commitments get diluted and everything depends on manual push.",
  },
  narrativa: {
    es: "Este eje evalua lenguaje comun y alineacion de contexto. Sin narrativa compartida, cada equipo interpreta distinto las prioridades.",
    en: "This axis evaluates shared language and context alignment. Without a shared narrative, teams interpret priorities differently.",
  },
};

function t() {
  return UI[state.lang] || UI.es;
}

function trackPixel(eventName) {
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName);
  }
}

function updateAnalyticsStep() {
  if (state.showResult) {
    analytics.lastStep = `results_tab_${state.resultTab}`;
    return;
  }
  if (state.step === -1) {
    analytics.lastStep = "intro";
    return;
  }
  const q = ALL_QS[state.step];
  if (!q) {
    analytics.lastStep = "unknown";
    return;
  }
  analytics.lastStep = q.type === "ctx" ? `context_${q.id}` : `diag_${q.idx + 1}`;
}

function buildAnalyticsPayload(forceResults = false) {
  const includeResults = forceResults || state.showResult;
  const r = includeResults ? calcResults() : null;
  const payload = new URLSearchParams();
  payload.append("form-name", "bas_stress_test");
  payload.append("lead_name", "");
  payload.append("lead_email", "");
  payload.append("lead_company", "");
  payload.append("res_score_efficiency", r ? String(Math.round(r.avg)) : "");
  payload.append(
    "res_financial_impact",
    r ? String(Math.round(r.totalFriction)) : "",
  );
  payload.append("last_step_reached", analytics.lastStep);
  payload.append("device_type", analytics.deviceType);
  payload.append("geo_city", analytics.city);
  payload.append("geo_country", analytics.country);
  return payload;
}

function submitAnalytics({ final = false, useBeacon = false } = {}) {
  if (!analytics.hasStarted) return;
  if (final && analytics.hasFinalSubmit) return;
  const payload = buildAnalyticsPayload(final);
  if (useBeacon && navigator.sendBeacon) {
    navigator.sendBeacon("/", payload);
  } else {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
      keepalive: true,
    }).catch(() => {});
  }
  if (final) analytics.hasFinalSubmit = true;
}

function submitLeadCapture() {
  const r = calcResults();
  const payload = new URLSearchParams();
  payload.append("form-name", "bas_stress_test");
  payload.append("lead_name", state.lead.name.trim());
  payload.append("lead_email", state.lead.email.trim());
  payload.append("lead_company", state.lead.company.trim());
  payload.append("res_score_efficiency", String(Math.round(r.avg)));
  payload.append("res_financial_impact", String(Math.round(r.totalFriction)));
  payload.append("last_step_reached", "results_lead_gate");
  payload.append("device_type", analytics.deviceType);
  payload.append("geo_city", analytics.city);
  payload.append("geo_country", analytics.country);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: payload.toString(),
    keepalive: true,
  }).catch(() => {});
}

function openLeadGate(targetTab = 1) {
  state.lead.modalOpen = true;
  state.lead.targetTab = targetTab;
  state.lead.error = "";
  state.lead.errorField = "";
}

async function detectGeo() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) return;
    const geo = await response.json();
    analytics.city = geo.city || "N/A";
    analytics.country = geo.country_name || "N/A";
  } catch (_) {
    // no-op
  }
}

function markHistoryPush() {
  nextHistoryMode = "push";
}

function getRouteFromState() {
  if (state.showResult) return `#results-${state.resultTab}`;
  if (state.step < 0) return "#intro";
  return `#q-${state.step + 1}`;
}

function getHistorySnapshot() {
  return {
    step: state.step,
    showResult: state.showResult,
    resultTab: state.resultTab,
  };
}

function applyHistorySnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== "object") return false;
  const step = Number(snapshot.step);
  const tab = Number(snapshot.resultTab);
  const showResult = Boolean(snapshot.showResult);

  if (showResult) {
    state.showResult = true;
    const requestedTab = Number.isFinite(tab) ? Math.max(0, Math.min(2, tab)) : 0;
    state.resultTab = !state.lead.submitted && requestedTab > 0 ? 0 : requestedTab;
    state.step = Number.isFinite(step)
      ? Math.max(-1, Math.min(ALL_QS.length - 1, step))
      : ALL_QS.length - 1;
  } else {
    state.showResult = false;
    state.resultTab = 0;
    state.step = Number.isFinite(step)
      ? Math.max(-1, Math.min(ALL_QS.length - 1, step))
      : -1;
  }

  state.axisModal = null;
  state.lead.modalOpen = false;
  state.lead.error = "";
  state.lead.errorField = "";
  return true;
}

function applyRouteFromHash(hash) {
  if (!hash || typeof hash !== "string") return false;
  if (hash === "#intro") {
    state.showResult = false;
    state.step = -1;
    state.resultTab = 0;
    return true;
  }

  const qMatch = hash.match(/^#q-(\d+)$/);
  if (qMatch) {
    const qNumber = Number(qMatch[1]);
    if (!Number.isFinite(qNumber)) return false;
    state.showResult = false;
    state.resultTab = 0;
    state.step = Math.max(-1, Math.min(ALL_QS.length - 1, qNumber - 1));
    return true;
  }

  const resMatch = hash.match(/^#results-(\d+)$/);
  if (resMatch) {
    const tabNumber = Number(resMatch[1]);
    if (!Number.isFinite(tabNumber)) return false;
    state.showResult = true;
    const requestedTab = Math.max(0, Math.min(2, tabNumber));
    state.resultTab = !state.lead.submitted && requestedTab > 0 ? 0 : requestedTab;
    state.step = Math.max(state.step, ALL_QS.length - 1);
    return true;
  }

  return false;
}

function syncRouteWithState() {
  if (isApplyingPopState) {
    lastSyncedRoute = getRouteFromState();
    nextHistoryMode = "replace";
    return;
  }

  const route = getRouteFromState();
  const url = `${window.location.pathname}${window.location.search}${route}`;
  const mode = nextHistoryMode === "push" && route !== lastSyncedRoute ? "pushState" : "replaceState";
  window.history[mode](getHistorySnapshot(), "", url);
  lastSyncedRoute = route;
  nextHistoryMode = "replace";
}

function hydrateStateFromLocation() {
  const fromHistory = applyHistorySnapshot(window.history.state);
  const fromHash = !fromHistory && applyRouteFromHash(window.location.hash || "");
  if ((fromHistory || fromHash) && state.step >= 0) analytics.hasStarted = true;
  lastSyncedRoute = getRouteFromState();
}

function getLiveStatusText() {
  const tx = t();
  if (state.showResult) {
    const activeTab = [tx.tabLevel, tx.tabAxes, tx.tabImpact][state.resultTab] || tx.tabLevel;
    return `${tx.liveResults}: ${activeTab}`;
  }
  if (state.step < 0) return tx.liveIntro;
  return `${tx.liveQuestion} ${state.step + 1} ${tx.liveOf} ${ALL_QS.length}`;
}

function updateA11yHelpers() {
  const tx = t();
  const skipLink = document.getElementById("skip-link");
  if (skipLink) skipLink.textContent = tx.skipToMain;
  const langToggle = document.getElementById("lang-toggle-btn");
  if (langToggle) langToggle.setAttribute("aria-label", tx.langToggleAria);
  const liveRegion = document.getElementById("app-live-status");
  if (liveRegion) liveRegion.textContent = getLiveStatusText();
}

function getPhrase(eje, score) {
  const thresholds = [0, 25, 50, 75, 100];
  let best = 0;
  for (const th of thresholds) {
    if (score >= th) best = th;
  }
  const map = state.lang === "en" ? DIAG_PHRASES_EN : DIAG_PHRASES;
  return map[eje][best];
}

function getAxisLabel(eje) {
  return state.lang === "en" ? eje.name_en : eje.name;
}

function getAxisMeta(eje) {
  return state.lang === "en" ? eje.meta_en : eje.meta;
}

function getQuestionLabel(q) {
  return state.lang === "en" ? q.q_en || q.q : q.q;
}

function getOptLabel(opt) {
  return state.lang === "en" ? opt.label_en || opt.label : opt.label;
}

function getCityName(city) {
  return state.lang === "en" ? city.name_en : city.name;
}

function getCityPhrase(city) {
  return state.lang === "en" ? city.phrase_en : city.phrase;
}

function getCityAnalogy(city) {
  return state.lang === "en" ? city.analogy_en : city.analogy;
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function focusLeadField(field) {
  const map = {
    name: "lead-name",
    email: "lead-email",
    company: "lead-company",
  };
  const id = map[field];
  if (!id) return;
  requestAnimationFrame(() => {
    const node = document.getElementById(id);
    if (node instanceof HTMLElement) node.focus();
  });
}

function maybeOpenAxisModalForStep() {
  if (state.showResult || state.step < 0 || state.axisModal) return;
  const current = ALL_QS[state.step];
  if (!current || current.type !== "diag") return;

  const prev = ALL_QS[state.step - 1];
  const isAxisStart =
    state.step === CONTEXT_QS.length ||
    !prev ||
    prev.type !== "diag" ||
    prev.eje !== current.eje;

  if (!isAxisStart) return;
  if (state.axisTipsSeen[current.eje]) return;

  state.axisTipsSeen[current.eje] = true;
  state.axisModal = current.eje;
}

function calcResults() {
  const ejeScores = {};
  const ejeFrictions = {};
  const costH = state.ctxAnswers.costo_hora?.val || 650;
  const tamDir = state.ctxAnswers.tam_directivo?.val || 7;
  const ingreso = state.ctxAnswers.ingreso?.val || 50e6;

  EJES.forEach((eje) => {
    const qs = DIAG_QS.map((q, i) => ({ ...q, globalIdx: i })).filter(
      (q) => q.eje === eje.id,
    );
    let totalPts = 0;
    qs.forEach((q) => {
      const chosen = state.answers[q.globalIdx];
      if (chosen !== undefined) totalPts += q.opts[chosen].pts;
    });
    ejeScores[eje.id] = (totalPts / qs.length) * 4;
  });

  const juntasIdx = DIAG_QS.findIndex(
    (q) => q.eje === "rituales" && q.q.includes("juntas recurrentes"),
  );
  const asistIdx = DIAG_QS.findIndex(
    (q) => q.eje === "rituales" && q.q.includes("personas asisten"),
  );
  const decIdx = DIAG_QS.findIndex(
    (q) => q.eje === "rituales" && q.q.includes("porcentaje"),
  );
  const juntasN = DIAG_QS[juntasIdx]?.fricVal?.[state.answers[juntasIdx] ?? 1] || 6.5;
  const asistN = DIAG_QS[asistIdx]?.fricVal?.[state.answers[asistIdx] ?? 1] || 6;
  const pctSinDec = DIAG_QS[decIdx]?.fricVal?.[state.answers[decIdx] ?? 1] || 0.35;
  ejeFrictions.rituales = juntasN * asistN * 1.25 * pctSinDec * costH * 52 * 0.6;

  const decEscIdx = DIAG_QS.findIndex(
    (q) => q.eje === "gobernanza" && q.q.includes("decisiones por semana"),
  );
  const reabIdx = DIAG_QS.findIndex(
    (q) => q.eje === "gobernanza" && q.q.includes("re-discute"),
  );
  const decEsc = DIAG_QS[decEscIdx]?.fricVal?.[state.answers[decEscIdx] ?? 1] || 4;
  const reab = DIAG_QS[reabIdx]?.fricVal?.[state.answers[reabIdx] ?? 1] || 2;
  ejeFrictions.gobernanza =
    (decEsc * 1.5 * 2 + reab * 3 * tamDir * 0.5) * costH * 52 * 0.6;

  const prioIdx = DIAG_QS.findIndex(
    (q) => q.eje === "estrategia" && q.q.includes("prioridades estratégicas"),
  );
  const projIdx = DIAG_QS.findIndex(
    (q) => q.eje === "estrategia" && q.q.includes("iniciaron pero no"),
  );
  const prioExc = Math.max(
    0,
    (DIAG_QS[prioIdx]?.fricVal?.[state.answers[prioIdx] ?? 1] || 5) - 3,
  );
  const projDead = DIAG_QS[projIdx]?.fricVal?.[state.answers[projIdx] ?? 1] || 2.5;
  ejeFrictions.estrategia =
    (prioExc * tamDir * 2 * costH * 52 + projDead * 80 * costH) * 0.6;

  const intIdx = DIAG_QS.findIndex(
    (q) =>
      q.eje === "accountability" && q.q.includes("intervenir personalmente"),
  );
  const repIdx = DIAG_QS.findIndex(
    (q) =>
      q.eje === "accountability" && q.q.includes("mismas conversaciones"),
  );
  const intN = DIAG_QS[intIdx]?.fricVal?.[state.answers[intIdx] ?? 1] || 4;
  const repN = DIAG_QS[repIdx]?.fricVal?.[state.answers[repIdx] ?? 1] || 2;
  ejeFrictions.accountability =
    (intN * 3 * costH * 12 + repN * tamDir * 1.5 * costH * 52) * 0.6;

  const reexpIdx = DIAG_QS.findIndex(
    (q) => q.eje === "narrativa" && q.q.includes("re-explicarla"),
  );
  const reexp = DIAG_QS[reexpIdx]?.fricVal?.[state.answers[reexpIdx] ?? 1] || 1;
  ejeFrictions.narrativa =
    (reexp * tamDir * 2 * costH * 52 + tamDir * 1 * costH * 26) * 0.6;

  const totalFriction = Object.values(ejeFrictions).reduce((a, b) => a + b, 0);
  const avg = Object.values(ejeScores).reduce((a, b) => a + b, 0) / 5;
  const level = getCityLevel(avg, ejeScores);
  const pctIngreso = ((totalFriction / ingreso) * 100).toFixed(1);
  const criticalEjes = Object.entries(ejeScores)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2)
    .map(([k]) => k);

  return {
    ejeScores,
    ejeFrictions,
    totalFriction,
    level,
    avg,
    pctIngreso,
    criticalEjes,
    costH,
    ingreso,
  };
}

function setLang(lang) {
  state.lang = lang;
  render();
}

function handleAnswer(qIndex, optIndex) {
  const q = ALL_QS[qIndex];
  if (q.type === "ctx") {
    state.ctxAnswers[q.id] = q.opts[optIndex];
  } else {
    state.answers[q.idx] = optIndex;
  }
  render();

  if (navTimer) clearTimeout(navTimer);
  if (qIndex < ALL_QS.length - 1) {
    navTimer = setTimeout(() => {
      state.step = qIndex + 1;
      if (state.step === CONTEXT_QS.length) trackPixel("bas_context_complete");
      markHistoryPush();
      render();
    }, 180);
  } else {
    navTimer = setTimeout(() => {
      state.showResult = true;
      state.resultTab = 0;
      trackPixel("bas_quiz_complete");
      submitAnalytics({ final: true });
      markHistoryPush();
      render();
    }, 240);
  }
}

function restart() {
  if (navTimer) clearTimeout(navTimer);
  state.step = -1;
  state.answers = {};
  state.ctxAnswers = {};
  state.showResult = false;
  state.resultTab = 0;
  state.axisTipsSeen = {};
  state.axisModal = null;
  state.lead = {
    submitted: false,
    modalOpen: false,
    targetTab: 1,
    name: "",
    email: "",
    company: "",
    error: "",
    errorField: "",
  };
  analytics.hasStarted = false;
  analytics.hasFinalSubmit = false;
  markHistoryPush();
  render();
}

function renderSkylineLevel(level) {
  const tx = t();
  const allLevels = [1, 2, 3, 4];
  return `
    <p class="level-hover-hint">${tx.levelHoverHint}</p>
    <div class="skyline-wrap">
      ${allLevels
        .map((lv) => {
          const city = CITY[lv];
          const active = lv === level;
          return `
            <div class="skyline-level ${active ? "active" : ""}" tabindex="0" style="--city-color:${city.color};">
              <div class="skyline-bars">
                ${city.bldgs
                  .map(
                    (h) => `
                    <div
                      style="width:${active ? 9 : 6}px;height:${h * (active ? 68 : 40)}px;background:${
                      active ? city.color : "#d1d5db"
                    };border-radius:2px 2px 0 0;">
                    </div>`,
                  )
                  .join("")}
              </div>
              <div class="skyline-level-index" style="color:${active ? city.color : "#6b7280"};">${lv}</div>
              <div class="skyline-tooltip">
                <div class="skyline-tooltip-title">${tx.levelTag} ${lv} · ${getCityName(city)}</div>
                <p class="skyline-tooltip-copy">${getCityAnalogy(city)}</p>
              </div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderAxisStepper(currentAxisId) {
  const currentAxisIndex = EJES.findIndex((eje) => eje.id === currentAxisId);
  return `
    <div class="axis-stepper">
      ${EJES.map((eje, idx) => {
        const done = idx < currentAxisIndex;
        const active = idx === currentAxisIndex;
        return `
          <div class="axis-step ${done ? "done" : ""} ${active ? "active" : ""}" style="--axis-color:${eje.color};">
            <span class="axis-step-index">${idx + 1}</span>
            <span class="axis-step-name">${getAxisLabel(eje)}</span>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderBreadcrumbs(items) {
  const tx = t();
  const safeItems = items.filter(Boolean);
  if (!safeItems.length) return "";
  return `
    <nav class="crumbs" aria-label="${tx.crumbNavLabel}">
      <ol class="crumb-list">
        ${safeItems
          .map((item, idx) => {
            const isCurrent = idx === safeItems.length - 1;
            return `
              <li class="crumb-item ${isCurrent ? "current" : ""}">
                <span class="crumb-text">${esc(item)}</span>
                ${isCurrent ? "" : '<span class="crumb-sep" aria-hidden="true">/</span>'}
              </li>
            `;
          })
          .join("")}
      </ol>
    </nav>
  `;
}

function renderIntro() {
  const tx = t();
  return `
    <div
      id="intro-screen"
      class="p-6 min-h-screen flex flex-col justify-center bg-[#F0F2DA] relative overflow-hidden"
    >
      <div
        class="blob bg-[#0A56C6] w-96 h-96 rounded-full top-[-10%] right-[-10%]"
      ></div>
      <div
        class="blob bg-[#E05D2E] w-64 h-64 rounded-full bottom-[-10%] left-[-10%] opacity-20"
      ></div>

      <div class="max-w-6xl mx-auto fade-in z-10 pt-16">
        <div class="flex justify-center mb-3 md:mb-4">
          <span
            class="font-mono text-[10px] md:text-[11px] font-semibold tracking-[0.18em] text-[#011963]/90 uppercase border border-[#011963]/30 px-3 py-1.5 md:px-4 md:py-2 rounded-full"
          >
            AB System Quiz
          </span>
        </div>
        <div
          class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-8 items-stretch bg-[#011963] rounded-3xl overflow-hidden"
        >
          <div class="p-8 md:p-12 pt-10 md:pt-14 pl-10 md:pl-14 pr-6 md:pr-8 flex flex-col h-full">
            <div class="space-y-4 md:space-y-5">
              <p class="text-[11px] md:text-xs uppercase tracking-[0.16em] font-semibold text-white/70">
                ${tx.introKickerTop}
              </p>
              <h1
                class="text-3xl md:text-[3rem] font-extrabold text-[#04A45A] tracking-normal leading-[1.08] max-w-[16ch]"
              >
                ${tx.introTitle}
              </h1>
              <p
                class="text-xl md:text-2xl text-[#04A45A] leading-snug font-semibold max-w-[25ch]"
              >
                ${tx.introTitleSupport}
              </p>
              <p class="text-sm md:text-lg text-white/90 leading-relaxed font-light max-w-[46ch]">
                ${tx.introSubtitle}
              </p>
            </div>

            <div class="mt-7 md:mt-8">
              <button
                data-action="start"
                class="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-[#F66D3A] hover:bg-[#E85F2C] rounded-full overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto"
              >
                <span class="relative z-10 mr-2">${tx.start}</span>
                <i
                  data-lucide="arrow-right"
                  aria-hidden="true"
                  class="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform"
                ></i>
              </button>
            </div>

            <div class="mt-5 md:mt-6 space-y-2 pb-2">
              <div class="flex items-center gap-2 text-white/90">
                <span
                  class="flex h-7 w-7 items-center justify-center rounded-full bg-[#F3B1D7]/20 text-[#F3B1D7] shrink-0"
                >
                  <i data-lucide="clock" aria-hidden="true" class="w-3.5 h-3.5 md:w-4 md:h-4"></i>
                </span>
                <span class="leading-tight font-semibold">${tx.timeEst}</span>
              </div>
              <div class="text-[11px] md:text-xs text-white/65 font-medium">
                <i data-lucide="file-check" aria-hidden="true" class="inline-block w-3.5 h-3.5 mr-1.5 align-[-2px]"></i>
                <span class="leading-tight">${tx.deliverable}</span>
                <span class="mx-2 opacity-50">•</span>
                <i data-lucide="lock" aria-hidden="true" class="inline-block w-3.5 h-3.5 mr-1.5 align-[-2px]"></i>
                <span class="leading-tight">${tx.privacyDetail}</span>
              </div>
            </div>
          </div>
          <div
            class="relative min-h-[260px] md:min-h-[420px] bg-[#00492C] p-0 flex overflow-hidden lg:w-[400px] w-full"
          >
            <img
              src="hero-1200.jpg"
              srcset="hero-900.jpg 900w, hero-1200.jpg 1200w, hero-1600.jpg 1600w"
              sizes="(max-width: 1024px) 100vw, 45vw"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              width="3360"
              height="5040"
              alt="Team working"
              class="w-full h-full object-cover rounded-none scale-[1.3] origin-center -translate-y-[8%]"
            />
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderQuestion() {
  const tx = t();
  const currentQ = ALL_QS[state.step];
  const isCtx = currentQ.type === "ctx";
  const currentEje = isCtx ? null : EJES.find((e) => e.id === currentQ.eje);
  const ejeQs = isCtx ? [] : DIAG_QS.filter((q) => q.eje === currentQ.eje);
  const ejeQIndex = isCtx ? -1 : ejeQs.findIndex((q) => q.q === currentQ.q);
  const selectedOpt = isCtx
    ? state.ctxAnswers[currentQ.id]
      ? currentQ.opts.indexOf(state.ctxAnswers[currentQ.id])
      : null
    : state.answers[currentQ.idx];

  const progress = state.step < 0 ? 0 : ((state.step + 1) / ALL_QS.length) * 100;
  const axisModalAxis = state.axisModal ? EJES.find((e) => e.id === state.axisModal) : null;
  const axisModalText = state.axisModal
    ? AXIS_EXPLAIN[state.axisModal]?.[state.lang] || ""
    : "";

  return `
    ${state.axisModal && axisModalAxis ? `
      <div class="axis-modal-backdrop">
        <div class="axis-modal">
          <p class="axis-modal-kicker">${tx.axisModalKicker}</p>
          <h3 class="axis-modal-title">${axisModalAxis.icon} ${getAxisLabel(axisModalAxis)} · ${getAxisMeta(axisModalAxis)}</h3>
          <p class="axis-modal-text">${axisModalText}</p>
          <button class="axis-modal-btn" data-action="close-axis-modal">${tx.axisModalCta}</button>
        </div>
      </div>
    ` : ""}

    <div class="question-stage">
      <section class="card question-wrap" aria-labelledby="question-title">
        ${renderBreadcrumbs([
          tx.crumbHome,
          tx.crumbQuiz,
          tx.crumbQuestions,
          isCtx ? tx.contextLabel : getAxisLabel(currentEje),
        ])}
        <div
          class="progress-track"
          role="progressbar"
          aria-label="${tx.progressLabel}"
          aria-valuemin="0"
          aria-valuemax="${ALL_QS.length}"
          aria-valuenow="${state.step + 1}"
        >
          <div class="progress-fill" style="width:${progress}%;"></div>
        </div>

        <div class="q-top">
          <span class="q-tag" style="color:${isCtx ? "#0A56C6" : currentEje.color};">
            ${isCtx ? tx.contextLabel : `${currentEje.icon} ${getAxisLabel(currentEje).toUpperCase()} · ${getAxisMeta(currentEje)}`}
          </span>
          <span class="q-counter" aria-label="${tx.progressLabel}">${state.step + 1}/${ALL_QS.length}</span>
        </div>

        ${
          isCtx
            ? ""
            : `<div class="axis-stepper-wrap">
                <p class="axis-stepper-title">${tx.axisStepperTitle}</p>
                ${renderAxisStepper(currentQ.eje)}
              </div>
              <div class="axis-dots" aria-hidden="true">${ejeQs
                .map((_, i) => `<span class="axis-dot ${i < ejeQIndex ? "done" : i === ejeQIndex ? "current" : ""}"></span>`)
                .join("")}</div>`
        }

        <h2 id="question-title" class="q-title">${getQuestionLabel(currentQ)}</h2>

        <div class="opts">
          ${currentQ.opts
            .map(
              (opt, idx) => `
              <button
                class="opt-btn ${selectedOpt === idx ? "selected" : ""}"
                data-action="choose"
                data-q-index="${state.step}"
                data-opt-index="${idx}"
              >
                ${getOptLabel(opt)}
              </button>
            `,
            )
            .join("")}
        </div>

        ${
          state.step > 0
            ? `<div class="back-row"><button class="back-btn" data-action="prev">${tx.prev}</button></div>`
            : ""
        }
      </section>
    </div>
  `;
}

function getBarColor(score) {
  if (score < 30) return "#B93D3D";
  if (score < 55) return "#E67E22";
  return "#1ABC9C";
}

function renderResultTabLevel(r) {
  const tx = t();
  const city = CITY[r.level];
  return `
    <section class="card result-card center">
      <p class="muted" style="margin:0;">${tx.levelTitle}</p>
      ${renderSkylineLevel(r.level)}
      <div style="margin-top:12px;padding:12px 14px;border-radius:12px;background:${city.color};color:#fff;">
        <div style="font-size:11px;font-weight:700;opacity:.85;">${tx.levelTag} ${r.level}</div>
        <div style="margin-top:4px;font-size:1.34rem;font-weight:800;">${getCityName(city)}</div>
      </div>
      <p class="subtitle" style="margin-top:12px;font-style:italic;">"${getCityPhrase(city)}"</p>
      <div class="city-analogy-box">
        <p class="city-analogy-kicker">${tx.cityAnalogyLabel}</p>
        <p class="city-analogy-copy">${getCityAnalogy(city)}</p>
      </div>
      <div style="margin-top:10px;padding:11px;border-radius:10px;background:#f8fbff;border:1px solid #dbeafe;">
        <div style="font-size:.8rem;color:#64748b;font-weight:700;">${tx.scoreAverage}</div>
        <p class="big-number">${Math.round(r.avg)}<span style="font-size:1rem;color:#6b7280;">/100</span></p>
      </div>
      <button class="btn-secondary" style="margin-top:10px;" data-action="set-tab" data-tab="1">${tx.viewAxis}</button>
    </section>
  `;
}

function renderResultTabAxes(r) {
  const tx = t();
  return `
    <section class="card result-card">
      <p class="scan-note">${tx.axisNote}</p>
      <div class="axis-scan-list">
        ${EJES.map((eje) => {
          const score = r.ejeScores[eje.id] || 0;
          const isCrit = r.criticalEjes.includes(eje.id);
          return `
            <article class="axis-scan-item ${isCrit ? "critical" : ""}">
              <div class="axis-scan-head">
                <span class="axis-icon">${eje.icon}</span>
                <div class="axis-name-block">
                  <h4 class="axis-name">${getAxisLabel(eje)}</h4>
                  <p class="axis-meta">${getAxisMeta(eje)}</p>
                </div>
                <div class="axis-score-wrap">
                  ${isCrit ? `<span class="crit-chip">⚠ ${tx.critTag}</span>` : ""}
                  <span class="axis-score">${Math.round(score)}</span>
                </div>
              </div>
              <div class="axis-scan-bar">
                <div class="axis-scan-fill ${isCrit ? "critical" : ""}" style="width:${score}%;"></div>
              </div>
              <p class="axis-phrase">${getPhrase(eje.id, score)}</p>
            </article>
          `;
        }).join("")}
      </div>

      <button class="btn-primary" style="margin-top:.9rem;background:#b93d3d;" data-action="set-tab" data-tab="2">${tx.viewImpact}</button>
    </section>
  `;
}

function renderResultTabImpact(r) {
  const tx = t();
  const sortedFrictions = Object.entries(r.ejeFrictions).sort((a, b) => b[1] - a[1]);
  const totalF = r.totalFriction;
  const topA = sortedFrictions[0];
  const topB = sortedFrictions[1];
  const top2Pct = topA && topB ? ((((topA[1] + topB[1]) / totalF) * 100).toFixed(0)) : "0";

  return `
    <section class="card result-card">
      <div class="impact-hero">
        <p class="muted" style="margin:0;font-size:.84rem;">${tx.impactTitle}</p>
        <p class="impact-main">${fmt(totalF)} MXN</p>
        <p class="impact-sub">~${fmt(totalF / 17)} USD / ${tx.ytd}</p>
        <p class="subtitle" style="font-size:.86rem;margin-top:.42rem;">${tx.impactExplainer}</p>
        <span class="impact-pill">${r.pctIngreso}% ${tx.impactPct}</span>
      </div>

      <div class="impact-list">
        ${sortedFrictions
          .map(([ejeId, fric], idx) => {
            const eje = EJES.find((x) => x.id === ejeId);
            const pct = ((fric / totalF) * 100).toFixed(0);
            return `
              <div class="impact-item">
                <div class="impact-item-head">
                  <span class="rank-badge ${idx < 2 ? "top" : ""}">${idx + 1}</span>
                  <span>${eje.icon}</span>
                  <div class="impact-axis">${getAxisLabel(eje)}</div>
                  <div class="impact-amount">
                    <span class="money">${fmt(fric)}</span>
                    <span class="pct">${pct}%</span>
                  </div>
                </div>
                <div class="impact-mini-track">
                  <div class="impact-mini-fill ${idx < 2 ? "top" : ""}" style="width:${pct}%;"></div>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>

      <div class="callout">
        ${tx.top2Prefix} <strong>${top2Pct}%</strong> ${tx.top2Middle}
        <strong style="color:${topA ? EJES.find((e) => e.id === topA[0]).color : "#111827"};">${topA ? getAxisLabel(EJES.find((e) => e.id === topA[0])) : "-"}</strong>
        ${state.lang === "en" ? "and" : "y"}
        <strong style="color:${topB ? EJES.find((e) => e.id === topB[0]).color : "#111827"};">${topB ? getAxisLabel(EJES.find((e) => e.id === topB[0])) : "-"}</strong>.
        ${tx.top2Suffix}
      </div>

      <div class="callout success">
        ${tx.investTextPrefix} <strong>${((150000 / totalF) * 100).toFixed(1)}%</strong> ${tx.investTextSuffix}
      </div>

      <div class="cta-stack">
        <button class="btn-primary" style="background:#011963;" data-action="schedule">${tx.schedule}</button>
        <button class="btn-ghost" data-action="restart">${tx.restart}</button>
      </div>
    </section>
  `;
}

async function downloadResultsPDF() {
  const capture = document.getElementById("results-capture");
  if (!capture) return;
  if (!window.html2canvas || !window.jspdf?.jsPDF) return;

  const canvas = await window.html2canvas(capture, {
    backgroundColor: "#f0f2da",
    scale: Math.min(2, window.devicePixelRatio || 1),
    useCORS: true,
  });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new window.jspdf.jsPDF("p", "mm", "a4");
  const pdfW = pdf.internal.pageSize.getWidth();
  const pdfH = pdf.internal.pageSize.getHeight();
  const imgW = pdfW;
  const imgH = (canvas.height * imgW) / canvas.width;

  let y = 0;
  pdf.addImage(imgData, "PNG", 0, y, imgW, imgH);
  let remaining = imgH - pdfH;
  while (remaining > 0) {
    y = remaining - imgH;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, y, imgW, imgH);
    remaining -= pdfH;
  }
  pdf.save(`AB-System-Report-${Date.now()}.pdf`);
}

function renderResults() {
  const tx = t();
  const r = calcResults();
  const locked = !state.lead.submitted;
  const nameInvalid = state.lead.errorField === "name";
  const emailInvalid = state.lead.errorField === "email";
  const currentResultTabLabel = [tx.tabLevel, tx.tabAxes, tx.tabImpact][state.resultTab] || tx.tabLevel;

  return `
    <section>
      ${renderBreadcrumbs([tx.crumbHome, tx.crumbQuiz, tx.crumbResults, currentResultTabLabel])}
      <div id="results-capture">
      <div class="tabs" role="tablist" aria-label="${tx.resultsNavLabel}">
        <button
          id="results-tab-0"
          role="tab"
          aria-selected="${state.resultTab === 0 ? "true" : "false"}"
          aria-controls="results-view"
          class="tab-btn ${state.resultTab === 0 ? "active" : ""}"
          data-action="set-tab"
          data-tab="0"
        >
          ${tx.tabLevel}
        </button>
        <button
          id="results-tab-1"
          role="tab"
          aria-selected="${state.resultTab === 1 ? "true" : "false"}"
          aria-controls="results-view"
          aria-disabled="${locked ? "true" : "false"}"
          class="tab-btn ${state.resultTab === 1 ? "active" : ""}"
          data-action="set-tab"
          data-tab="1"
        >
          ${tx.tabAxes}${locked ? ` · ${tx.detailsLockedTab}` : ""}
        </button>
        <button
          id="results-tab-2"
          role="tab"
          aria-selected="${state.resultTab === 2 ? "true" : "false"}"
          aria-controls="results-view"
          aria-disabled="${locked ? "true" : "false"}"
          class="tab-btn ${state.resultTab === 2 ? "active" : ""}"
          data-action="set-tab"
          data-tab="2"
        >
          ${tx.tabImpact}${locked ? ` · ${tx.detailsLockedTab}` : ""}
        </button>
      </div>

      <div id="results-view" role="tabpanel" aria-labelledby="results-tab-${state.resultTab}">
        ${state.resultTab === 0 ? renderResultTabLevel(r) : ""}
        ${state.resultTab === 1 ? renderResultTabAxes(r) : ""}
        ${state.resultTab === 2 ? renderResultTabImpact(r) : ""}
      </div>
      </div>

      ${
        state.lead.modalOpen
          ? `<div class="lead-gate-backdrop">
              <div class="lead-gate-card">
                <h3 class="lead-gate-title">${tx.leadGateTitle}</h3>
                <p class="lead-gate-sub">${tx.leadGateSubtitle}</p>
                <form id="lead-gate-form">
                  <label class="lead-label" for="lead-name">${tx.leadNameLabel}</label>
                  <input
                    id="lead-name"
                    class="lead-input"
                    type="text"
                    name="name"
                    data-lead-field="name"
                    placeholder="${tx.leadNamePh}"
                    value="${esc(state.lead.name)}"
                    autocomplete="name"
                    required
                    aria-invalid="${nameInvalid ? "true" : "false"}"
                    aria-describedby="${nameInvalid ? "lead-name-error" : ""}"
                  />
                  ${nameInvalid && state.lead.error ? `<p class="lead-error" id="lead-name-error" role="alert">${esc(state.lead.error)}</p>` : ""}

                  <label class="lead-label" for="lead-email">${tx.leadEmailLabel}</label>
                  <input
                    id="lead-email"
                    class="lead-input"
                    type="email"
                    name="email"
                    data-lead-field="email"
                    placeholder="${tx.leadEmailPh}"
                    value="${esc(state.lead.email)}"
                    autocomplete="email"
                    required
                    aria-invalid="${emailInvalid ? "true" : "false"}"
                    aria-describedby="${emailInvalid ? "lead-email-error" : ""}"
                  />
                  ${emailInvalid && state.lead.error ? `<p class="lead-error" id="lead-email-error" role="alert">${esc(state.lead.error)}</p>` : ""}

                  <label class="lead-label" for="lead-company">${tx.leadCompanyLabel}</label>
                  <input
                    id="lead-company"
                    class="lead-input"
                    type="text"
                    name="company"
                    data-lead-field="company"
                    placeholder="${tx.leadCompanyPh}"
                    value="${esc(state.lead.company)}"
                    autocomplete="organization"
                  />

                  ${!nameInvalid && !emailInvalid && state.lead.error ? `<p class="lead-error" role="alert">${esc(state.lead.error)}</p>` : ""}
                  <div class="lead-gate-actions">
                    <button type="button" class="btn-ghost" data-action="close-lead-gate">${tx.leadGateCancel}</button>
                    <button type="submit" class="btn-primary" style="width:100%;">${tx.leadGateSubmit}</button>
                  </div>
                </form>
              </div>
            </div>`
          : ""
      }
    </section>
  `;
}

function render() {
  const root = document.getElementById("app-root");
  if (!root) return;
  updateAnalyticsStep();
  const introMode = !state.showResult && state.step === -1;
  document.body.classList.toggle("mode-intro", introMode);
  const logo = document.getElementById("brand-logo");
  if (logo) logo.src = introMode ? "Group 17 (1).png" : "Group 18.png";

  const langToggle = document.getElementById("lang-toggle-btn");
  if (langToggle) {
    langToggle.innerHTML =
      state.lang === "es"
        ? `ES / <span class="opacity-50">EN</span>`
        : `<span class="opacity-50">ES</span> / EN`;
  }

  if (!state.showResult) {
    if (state.step >= 0) maybeOpenAxisModalForStep();
    root.innerHTML = state.step === -1 ? renderIntro() : renderQuestion();
  } else {
    root.innerHTML = renderResults();
  }

  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }

  updateA11yHelpers();
  syncRouteWithState();
}

document.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-action]");
  if (!btn) return;

  const action = btn.dataset.action;

  if (action === "toggle-lang") {
    setLang(state.lang === "es" ? "en" : "es");
    return;
  }

  if (action === "close-axis-modal") {
    state.axisModal = null;
    render();
    return;
  }

  if (action === "close-lead-gate") {
    state.lead.modalOpen = false;
    state.lead.error = "";
    state.lead.errorField = "";
    render();
    return;
  }

  if (action === "start") {
    state.step = 0;
    analytics.hasStarted = true;
    trackPixel("bas_start");
    markHistoryPush();
    render();
    return;
  }

  if (action === "choose") {
    const qIndex = Number(btn.dataset.qIndex);
    const optIndex = Number(btn.dataset.optIndex);
    if (Number.isNaN(qIndex) || Number.isNaN(optIndex)) return;
    handleAnswer(qIndex, optIndex);
    return;
  }

  if (action === "prev") {
    if (state.step > 0) {
      if (navTimer) clearTimeout(navTimer);
      state.step -= 1;
      markHistoryPush();
      render();
    }
    return;
  }

  if (action === "set-tab") {
    const tab = Number(btn.dataset.tab || "0");
    if (tab > 0 && !state.lead.submitted) {
      openLeadGate(tab);
      render();
      return;
    }
    state.resultTab = tab;
    if (tab === 2) trackPixel("bas_impact_view");
    markHistoryPush();
    render();
    return;
  }

  if (action === "download-pdf") {
    if (!state.lead.submitted) {
      openLeadGate(Math.max(1, state.resultTab));
      render();
      return;
    }
    downloadResultsPDF().catch(() => {});
    return;
  }

  if (action === "schedule") {
    trackPixel("bas_schedule_click");
    window.open(
      "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ13n-VFTAYru9tIM4eufl54AVz-Az9sxIQlHCJG42OBpnBHNbJYgjJbZJuQVZ6sASHwdDGch_Db",
      "_blank",
      "noopener,noreferrer",
    );
    return;
  }

  if (action === "restart") {
    trackPixel("bas_restart");
    restart();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (state.lead.modalOpen) {
      state.lead.modalOpen = false;
      state.lead.error = "";
      state.lead.errorField = "";
      render();
      return;
    }
    if (state.axisModal) {
      state.axisModal = null;
      render();
      return;
    }
  }

  const tabButton = event.target.closest(".tab-btn");
  if (!tabButton) return;
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

  const allTabs = Array.from(document.querySelectorAll(".tab-btn"));
  if (!allTabs.length) return;

  event.preventDefault();
  const currentIndex = allTabs.indexOf(tabButton);
  if (currentIndex < 0) return;

  let nextIndex = currentIndex;
  if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % allTabs.length;
  if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + allTabs.length) % allTabs.length;
  if (event.key === "Home") nextIndex = 0;
  if (event.key === "End") nextIndex = allTabs.length - 1;

  allTabs[nextIndex]?.focus();
});

document.addEventListener("input", (event) => {
  const input = event.target.closest("[data-lead-field]");
  if (!input) return;
  const field = input.dataset.leadField;
  if (!field) return;
  state.lead[field] = input.value;
  if (state.lead.errorField === field) {
    state.lead.error = "";
    state.lead.errorField = "";
  }
});

document.addEventListener("submit", (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  if (form.id !== "lead-gate-form") return;
  event.preventDefault();

  const tx = t();
  const name = (state.lead.name || "").trim();
  const email = (state.lead.email || "").trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name) {
    state.lead.error = tx.leadGateError;
    state.lead.errorField = "name";
    render();
    focusLeadField("name");
    return;
  }
  if (!validEmail) {
    state.lead.error = tx.leadGateError;
    state.lead.errorField = "email";
    render();
    focusLeadField("email");
    return;
  }

  state.lead.error = "";
  state.lead.errorField = "";
  state.lead.submitted = true;
  state.lead.modalOpen = false;
  state.resultTab = state.lead.targetTab || 1;
  submitLeadCapture();
  trackPixel("bas_lead_submit");
  markHistoryPush();
  render();
});

window.addEventListener("popstate", (event) => {
  isApplyingPopState = true;
  const applied =
    applyHistorySnapshot(event.state) || applyRouteFromHash(window.location.hash || "");
  if (applied) render();
  isApplyingPopState = false;
});

window.addEventListener("hashchange", () => {
  if (isApplyingPopState) return;
  const applied = applyRouteFromHash(window.location.hash || "");
  if (!applied) return;
  render();
});

window.addEventListener("beforeunload", () => {
  if (!analytics.hasStarted || analytics.hasFinalSubmit) return;
  updateAnalyticsStep();
  submitAnalytics({ useBeacon: true });
});

detectGeo();
hydrateStateFromLocation();
render();
