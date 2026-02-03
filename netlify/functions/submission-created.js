const https = require("https");

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

  const messageString = JSON.stringify(chatMessage);

  // 3. Enviar a Google Chat usando una Promesa para evitar Timeouts
  return new Promise((resolve, reject) => {
    const webhookUrl = new URL(
      "https://chat.googleapis.com/v1/spaces/AAQACbbgcsY/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=FsbCNmBrf7HC_diPmPkJOUyz_rMxmYpUVS-a-aBIHrA",
    );

    const options = {
      hostname: webhookUrl.hostname,
      path: webhookUrl.pathname + webhookUrl.search,
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Content-Length": Buffer.byteLength(messageString),
      },
      timeout: 5000, // Si en 5 segundos no responde Google, cerramos la función
    };

    const req = https.request(options, (res) => {
      resolve({ statusCode: 200, body: "Notificación enviada" });
    });

    req.on("error", (e) => {
      console.error("Error enviando a Google Chat:", e);
      resolve({ statusCode: 500, body: "Error en la notificación" });
    });

    req.write(messageString);
    req.end();
  });
};
