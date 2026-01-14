const { scanUrl } = require("../utils/urlUtils");
const { addHistory } = require("./history.controller");

exports.scanUrlController = async (req, res) => {
  const { url } = req.body;
  if (!url || typeof url !== "string") return res.status(400).json({ success: false, message: "URL is required" });

  const result = scanUrl(url);

  if (req.user?.id) await addHistory({ userId: req.user.id, tool: "URLSCAN", input: { url }, output: result, success: true });

  return res.json({ success: true, result });
};
