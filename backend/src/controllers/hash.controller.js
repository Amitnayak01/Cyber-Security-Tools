const CryptoJS = require("crypto-js");
const { addHistory } = require("./history.controller");

exports.generateHash = async (req, res) => {
  const { text, algorithm } = req.body;
  if (typeof text !== "string" || text.length === 0)
    return res.status(400).json({ success: false, message: "Text is required" });

  const algo = (algorithm || "").toUpperCase();
  let hash = "";

  switch (algo) {
    case "MD5": hash = CryptoJS.MD5(text).toString(); break;
    case "SHA1": hash = CryptoJS.SHA1(text).toString(); break;
    case "SHA256": hash = CryptoJS.SHA256(text).toString(); break;
    case "SHA512": hash = CryptoJS.SHA512(text).toString(); break;
    default:
      return res.status(400).json({ success: false, message: "Invalid algorithm. Use MD5/SHA1/SHA256/SHA512" });
  }

  const result = { algorithm: algo, hash };

  if (req.user?.id) {
    await addHistory({ userId: req.user.id, tool: "HASH", input: { algorithm: algo }, output: { hash }, success: true });
  }

  return res.json({ success: true, result });
};
