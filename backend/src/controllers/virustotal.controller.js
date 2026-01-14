const { addHistory } = require("./history.controller");

exports.scanUrlVirusTotal = async (req, res) => {
  const { url } = req.body;

  const apiKey = process.env.VIRUSTOTAL_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ success: false, message: "VirusTotal API key missing in env (VIRUSTOTAL_API_KEY)" });
  }
  if (!url) return res.status(400).json({ success: false, message: "URL is required" });

  const submitRes = await fetch("https://www.virustotal.com/api/v3/urls", {
    method: "POST",
    headers: {
      "x-apikey": apiKey,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({ url })
  });

  const submitData = await submitRes.json();
  if (!submitRes.ok) {
    return res.status(400).json({ success: false, message: "VirusTotal submit failed", details: submitData });
  }

  const analysisId = submitData?.data?.id;

  const analysisRes = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
    headers: { "x-apikey": apiKey }
  });

  const analysisData = await analysisRes.json();
  if (!analysisRes.ok) {
    return res.status(400).json({ success: false, message: "VirusTotal analysis fetch failed", details: analysisData });
  }

  if (req.user?.id) await addHistory({ userId: req.user.id, tool: "VIRUSTOTAL", input: { url }, output: analysisData, success: true });

  return res.json({ success: true, result: analysisData });
};
