const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tool: {
      type: String,
      enum: ["PASSWORD", "HASH", "CRYPTO", "URLSCAN", "PORTSCAN", "WHOIS", "VIRUSTOTAL", "PDF"],
      required: true
    },
    input: { type: Object, default: {} },
    output: { type: Object, default: {} },
    success: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);
