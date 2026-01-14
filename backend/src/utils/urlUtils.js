const validator = require("validator");

const suspiciousKeywords = ["login","verify","bank","free","gift","win","password","account","secure","confirm","bonus","click"];

function scanUrl(inputUrl) {
  const url = inputUrl.trim();
  const isValid = validator.isURL(url, { require_protocol: true });

  let protocol = null;
  let domain = null;
  if (isValid) {
    const u = new URL(url);
    protocol = u.protocol.replace(":", "");
    domain = u.hostname;
  }

  const lower = url.toLowerCase();
  const foundKeywords = suspiciousKeywords.filter((k) => lower.includes(k));

  let riskScore = 0;
  if (!isValid) riskScore += 3;
  if (protocol === "http") riskScore += 2;
  if (foundKeywords.length > 0) riskScore += foundKeywords.length;

  const status = riskScore >= 4 ? "Unsafe" : "Safe";

  return { url, isValid, protocol, domain, foundKeywords, riskScore, status };
}

module.exports = { scanUrl };
