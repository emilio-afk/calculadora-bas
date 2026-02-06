const https = require("https");

function postJson(urlString, payload) {
  return new Promise((resolve) => {
    let webhookUrl;
    try {
      webhookUrl = new URL(urlString);
    } catch (e) {
      console.error("URL invalida:", e);
      resolve({ ok: false, error: e });
      return;
    }

    const messageString = JSON.stringify(payload);
    const options = {
      hostname: webhookUrl.hostname,
      path: webhookUrl.pathname + webhookUrl.search,
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Content-Length": Buffer.byteLength(messageString),
      },
      timeout: 5000,
    };

    const req = https.request(options, (res) => {
      resolve({ ok: true, status: res.statusCode });
    });

    req.on("error", (e) => {
      console.error("Error enviando webhook:", e);
      resolve({ ok: false, error: e });
    });

    req.write(messageString);
    req.end();
  });
}

// Cambiamos a formato async para evitar el error de callback y el timeout
exports.handler = async function (event, context) {
  // 1. Extraer geolocalización directamente de los headers de Netlify
  // Estos datos son inyectados por el servidor de Netlify al recibir el form
  const city = event.headers["x-nf-geo-city"] || "Desconocida";
  const country = event.headers["x-nf-geo-country"] || "Desconocido";
  const userAgent = event.headers["user-agent"] || "N/A";

  const isMobile = /Mobi|Android|iPhone/i.test(userAgent);
  const deviceType = isMobile ? "📱 Móvil" : "💻 Desktop";

  let payload;
  try {
    const body = JSON.parse(event.body);
    payload = body.payload;
  } catch (e) {
    console.error("Error parseando JSON:", e);
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const { data } = payload;
  const isAbandonment = !data.lead_name && !data.lead_email;
  const statusTitle = isAbandonment
    ? "⚠️ ABANDONO DETECTADO"
    : "✅ TEST COMPLETADO";
  const stepReached = data.last_step_reached || "Desconocido";

  // 2. Preparar el mensaje para Google Chat
  const chatMessage = {
    text:
      `*${statusTitle}*\n` +
      `──────────────────────────\n` +
      `👤 *Lead:* ${data.lead_name || "Anónimo"}\n` +
      `📧 *Email:* ${data.lead_email || "N/A"}\n` +
      `🏢 *Empresa:* ${data.lead_company || "N/A"}\n\n` +
      `📍 *Ubicación:* ${city}, ${country}\n` +
      `🔌 *Dispositivo:* ${deviceType}\n` +
      `🏁 *Último paso:* ${stepReached}\n\n` +
      `📊 *Score:* ${data.res_score_efficiency || 0}/100\n` +
      `💰 *Impacto:* ${data.res_financial_impact ? "$" + parseInt(data.res_financial_impact).toLocaleString("en-US") : "$0"}`,
  };

  const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const sheetsPayload = {
    lead_name: data.lead_name || "",
    lead_email: data.lead_email || "",
    lead_company: data.lead_company || "",
    res_score_efficiency: data.res_score_efficiency || 0,
    res_financial_impact: data.res_financial_impact || 0,
    last_step_reached: stepReached,
    device_type: deviceType,
    geo_city: city,
    geo_country: country,
  };

  // 3. Enviar a Google Chat + Google Sheets (si hay webhook)
  await postJson(
    "https://chat.googleapis.com/v1/spaces/AAQACbbgcsY/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=FsbCNmBrf7HC_diPmPkJOUyz_rMxmYpUVS-a-aBIHrA",
    chatMessage,
  );

  if (sheetsWebhookUrl) {
    await postJson(sheetsWebhookUrl, sheetsPayload);
  } else {
    console.warn("GOOGLE_SHEETS_WEBHOOK_URL no configurado.");
  }

  return { statusCode: 200, body: "Notificaciones procesadas" };
};
