const https = require("https");

exports.handler = function (event, context, callback) {
  // 1. Parsear los datos del formulario que envía Netlify
  let payload;
  try {
    const body = JSON.parse(event.body);
    payload = body.payload;
  } catch (e) {
    console.error("Error parseando JSON de Netlify:", e);
    return callback(null, { statusCode: 400, body: "Error: Invalid JSON" });
  }

  // 2. Extraer los datos específicos de tu formulario TeamOS
  const { data } = payload;

  // 3. Crear el mensaje para Google Chat
  const chatMessage = {
    text:
      `🚀 **Nuevo Lead Capturado (TeamOS)**\n\n` +
      `👤 **Nombre:** ${data.lead_name || "No especificado"}\n` +
      `📧 **Email:** ${data.lead_email || "No especificado"}\n` +
      `🏢 **Empresa:** ${data.lead_company || "No especificado"}\n` +
      `📊 **Score:** ${data.res_score_efficiency || 0}/100\n` +
      `📉 **Impacto:** ${data.res_financial_impact ? "$" + parseInt(data.res_financial_impact).toLocaleString() : "$0"}\n` +
      `🔗 <https://app.netlify.com/sites/${payload.site_url ? payload.site_url.replace("https://", "").replace("/", "") : ""}/forms/${payload.form_id}|Ver en Netlify>`,
  };

  // 4. Preparar los datos para envío
  const messageString = JSON.stringify(chatMessage);

  // ==========================================
  // TU WEBHOOK URL YA ESTÁ INTEGRADA AQUÍ:
  // ==========================================
  const webhookUrl = new URL(
    "https://chat.googleapis.com/v1/spaces/AAQACbbgcsY/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=FsbCNmBrf7HC_diPmPkJOUyz_rMxmYpUVS-a-aBIHrA",
  );

  const requestOptions = {
    hostname: webhookUrl.hostname,
    path: webhookUrl.pathname + webhookUrl.search,
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Content-Length": Buffer.byteLength(messageString),
    },
  };

  // 5. Enviar la petición a Google Chat
  const req = https.request(requestOptions, (res) => {
    console.log(`Google Chat respondió con status: ${res.statusCode}`);

    if (res.statusCode < 200 || res.statusCode > 299) {
      callback(null, {
        statusCode: res.statusCode,
        body: "Error enviando a Google Chat",
      });
      return;
    }

    callback(null, {
      statusCode: 200,
      body: "Notificación enviada con éxito",
    });
  });

  req.on("error", (e) => {
    console.error("Error de conexión con Google Chat:", e);
    callback(null, {
      statusCode: 500,
      body: "Error interno del servidor: " + e.message,
    });
  });

  req.write(messageString);
  req.end();
};
