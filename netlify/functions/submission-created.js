const https = require("https");

exports.handler = function (event, context, callback) {
  let payload;
  try {
    const body = JSON.parse(event.body);
    payload = body.payload;
  } catch (e) {
    console.error("Error parseando JSON de Netlify:", e);
    return callback(null, { statusCode: 400, body: "Error: Invalid JSON" });
  }

  const { data } = payload;

  // --- EXTRACCIÓN DE DATOS DE GEOLOCALIZACIÓN Y TÉCNICOS ---
  // Netlify proporciona estos datos en el objeto de la petición
  const city = payload.data.city || "Desconocida";
  const country = payload.data.country || "Desconocido";
  const ip = payload.ip || "0.0.0.0";
  const userAgent = payload.user_agent || "N/A";

  // Detectar dispositivo de forma simple
  const isMobile = /Mobi|Android|iPhone/i.test(userAgent);
  const deviceType = isMobile ? "📱 Móvil" : "💻 Desktop";

  // URL de tu Google Spreadsheet
  const sheetUrl =
    "https://docs.google.com/spreadsheets/d/1pqt2lcNU1UTUxFKzxQ1KT5b19ycJY2Vg5HppXR_HGT4/edit?gid=682018988#gid=682018988";

  // Lógica de detección de abandono
  const isAbandonment = !data.lead_name && !data.lead_email;
  const statusTitle = isAbandonment
    ? "⚠️ LEAD PERDIDO (Abandono)"
    : "✅ NUEVO LEAD: TeamOS Stress Test";
  const stepReached = data.last_step_reached || "Inicio / Intro";

  // 3. Crear el mensaje para Google Chat enriquecido
  const chatMessage = {
    text:
      `*${statusTitle}*\n` +
      `──────────────────────────\n` +
      `👤 *Datos del Usuario:*\n` +
      `Nombre:  ${data.lead_name || "_No proporcionado_"}\n` +
      `Empresa: ${data.lead_company || "_No proporcionado_"}\n` +
      `Email:   ${data.lead_email || "_No proporcionado_"}\n\n` +
      `📍 *Ubicación:* ${city}, ${country}\n` +
      `🔌 *Dispositivo:* ${deviceType}\n\n` +
      `🏁 *Punto de salida:* ${stepReached}\n` +
      `📊 *Score:* ${data.res_score_efficiency || 0}/100\n` +
      `💰 *Impacto:* ${data.res_financial_impact ? "$" + parseInt(data.res_financial_impact).toLocaleString("en-US") : "$0"}\n\n` +
      `📄 <${sheetUrl}|Ver Registro en Google Sheets>`,
  };

  const messageString = JSON.stringify(chatMessage);

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

  const req = https.request(requestOptions, (res) => {
    if (res.statusCode < 200 || res.statusCode > 299) {
      callback(null, {
        statusCode: res.statusCode,
        body: "Error enviando a Google Chat",
      });
      return;
    }
    callback(null, { statusCode: 200, body: "Notificación enviada con éxito" });
  });

  req.on("error", (e) => {
    callback(null, { statusCode: 500, body: "Error interno: " + e.message });
  });

  req.write(messageString);
  req.end();
};
