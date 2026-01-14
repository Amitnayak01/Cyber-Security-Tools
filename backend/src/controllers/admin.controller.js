const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.listUsers = async (req, res) => {
  const users = await User.find({}, { passwordHash: 0, refreshTokenHash: 0 }).sort({ createdAt: -1 });
  return res.json({ success: true, result: users });
};

exports.createUser = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ success: false, message: "username and password required" });

  const allowedRoles = ["user", "analyst", "admin"];
  const finalRole = allowedRoles.includes(role) ? role : "user";

  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ success: false, message: "username already exists" });

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({ username, passwordHash, role: finalRole });

  return res.json({ success: true, message: "User created ✅", result: { id: user._id, username: user.username, role: user.role } });
};

exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const allowedRoles = ["user", "analyst", "admin"];
  if (!allowedRoles.includes(role)) return res.status(400).json({ success: false, message: "Invalid role" });

  if (id === req.user.id && role !== "admin") {
    return res.status(400).json({ success: false, message: "You cannot change your own admin role" });
  }

  const user = await User.findByIdAndUpdate(id, { role }, { new: true });
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  return res.json({ success: true, message: "Role updated ✅", result: { id: user._id, username: user.username, role: user.role } });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (id === req.user.id) return res.status(400).json({ success: false, message: "You cannot delete yourself" });

  await User.findByIdAndDelete(id);
  return res.json({ success: true, message: "User deleted ✅" });
};
