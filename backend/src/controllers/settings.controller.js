const Setting = require("../models/Setting");

exports.getSettings = async (req, res) => {
  const settings = await Setting.find().sort({ createdAt: -1 });
  const safe = settings.map((s) => ({
    _id: s._id,
    key: s.key,
    valueMasked: s.value ? `${"*".repeat(Math.max(0, s.value.length - 4))}${s.value.slice(-4)}` : ""
  }));
  return res.json({ success: true, result: safe });
};

exports.updateSetting = async (req, res) => {
  const { key, value } = req.body;
  if (!key) return res.status(400).json({ success: false, message: "key required" });

  await Setting.findOneAndUpdate({ key }, { value: value || "" }, { upsert: true, new: true });
  return res.json({ success: true, message: "Setting updated ✅" });
};
