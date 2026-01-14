const rateLimit = require("express-rate-limit");

const scannerLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many scan requests. Please try again after 1 minute." },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = { scannerLimiter };
