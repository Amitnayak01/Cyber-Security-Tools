const CryptoJS = require("crypto-js");
const { addHistory } = require("./history.controller");

exports.encryptText = async (req, res) => {
  const { text, key } = req.body;
  if (!text || !key) return res.status(400).json({ success: false, message: "Text and Secret Key are required" });

  const encrypted = CryptoJS.AES.encrypt(text, key).toString();
  if (req.user?.id) await addHistory({ userId: req.user.id, tool: "CRYPTO", input: { mode: "encrypt" }, output: { encrypted }, success: true });
  return res.json({ success: true, result: { encrypted } });
};

exports.decryptText = async (req, res) => {
  const { encryptedText, key } = req.body;
  if (!encryptedText || !key) return res.status(400).json({ success: false, message: "Encrypted text and Secret Key are required" });

  const bytes = CryptoJS.AES.decrypt(encryptedText, key);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  if (!decrypted) return res.status(400).json({ success: false, message: "Invalid key or corrupted encrypted text" });

  if (req.user?.id) await addHistory({ userId: req.user.id, tool: "CRYPTO", input: { mode: "decrypt" }, output: { decrypted }, success: true });
  return res.json({ success: true, result: { decrypted } });
};
