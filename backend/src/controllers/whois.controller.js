const whois = require("whois-json");
const { addHistory } = require("./history.controller");

exports.whoisLookup = async (req, res) => {
  const { domain } = req.body;
  if (!domain) return res.status(400).json({ success: false, message: "Domain is required" });

  const result = await whois(domain);

  if (req.user?.id) await addHistory({ userId: req.user.id, tool: "WHOIS", input: { domain }, output: result, success: true });

  return res.json({ success: true, result });
};
