const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");

function signAccessToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m" }
  );
}

function signRefreshToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d"
  });
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

exports.seedAdmin = async () => {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "admin123";

  const existing = await User.findOne({ username });
  if (existing) return;

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  await User.create({ username, passwordHash, role: "admin" });
  console.log("✅ Admin user created:", username);
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ success: false, message: "Username and password required" });

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ success: false, message: "Invalid credentials" });

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  user.refreshTokenHash = hashToken(refreshToken);
  await user.save();

  return res.json({
    success: true,
    result: {
      accessToken,
      refreshToken,
      user: { id: user._id, username: user.username, role: user.role }
    }
  });
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ success: false, message: "refreshToken required" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ success: false, message: "Invalid refresh token" });

    const tokenHash = hashToken(refreshToken);
    if (!user.refreshTokenHash || user.refreshTokenHash !== tokenHash) {
      return res.status(401).json({ success: false, message: "Refresh token revoked" });
    }

    const newAccessToken = signAccessToken(user);
    const newRefreshToken = signRefreshToken(user);

    user.refreshTokenHash = hashToken(newRefreshToken);
    await user.save();

    return res.json({ success: true, result: { accessToken: newAccessToken, refreshToken: newRefreshToken } });
  } catch (e) {
    return res.status(401).json({ success: false, message: "Invalid/expired refresh token" });
  }
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ success: false, message: "refreshToken required" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (user) {
      user.refreshTokenHash = "";
      await user.save();
    }
    return res.json({ success: true, message: "Logged out ✅" });
  } catch (e) {
    return res.json({ success: true, message: "Logged out ✅" });
  }
};

exports.me = async (req, res) => res.json({ success: true, user: req.user });
