const { getPasswordStrength } = require("../utils/passwordUtils");
const { addHistory } = require("./history.controller");

exports.checkPasswordStrength = async (req, res) => {
  const { password } = req.body;
  if (typeof password !== "string") {
    return res.status(400).json({ success: false, message: "Password must be a string" });
  }

  const result = getPasswordStrength(password);

  if (req.user?.id) {
    await addHistory({
      userId: req.user.id,
      tool: "PASSWORD",
      input: { password: "[hidden]" },
      output: result,
      success: true
    });
  }

  return res.json({ success: true, result });
};
