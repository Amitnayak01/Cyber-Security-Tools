const History = require("../models/History");

exports.addHistory = async ({ userId, tool, input, output, success = true }) => {
  try {
    await History.create({ userId, tool, input, output, success });
  } catch (e) {
    console.log("⚠️ History save failed:", e.message);
  }
};

exports.getHistory = async (req, res) => {
  const items = await History.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(200);
  return res.json({ success: true, result: items });
};

exports.clearHistory = async (req, res) => {
  await History.deleteMany({ userId: req.user.id });
  return res.json({ success: true, message: "History cleared ✅" });
};
