function allowRoles(...roles) {
  return function (req, res, next) {
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Requires role [${roles.join(", ")}]`
      });
    }
    next();
  };
}

module.exports = { allowRoles };
