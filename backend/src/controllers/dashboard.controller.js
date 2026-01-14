const History = require("../models/History");
const User = require("../models/User");

exports.getDashboardStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalLogs = await History.countDocuments();

  const toolUsage = await History.aggregate([
    { $group: { _id: "$tool", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  const successStats = await History.aggregate([{ $group: { _id: "$success", count: { $sum: 1 } } }]);

  return res.json({ success: true, result: { totalUsers, totalLogs, toolUsage, successStats } });
};
