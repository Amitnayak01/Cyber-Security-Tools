const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");
const errorMiddleware = require("./middlewares/error.middleware");
const { seedAdmin } = require("./controllers/auth.controller");

dotenv.config();

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));

const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175"
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman

      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(new Error("CORS blocked: " + origin));
    },
    credentials: true
  })
);


app.get("/health", (req, res) => {
  res.json({ success: true, message: "Backend is running ✅" });
});

// Auth + admin
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));
app.use("/api/settings", require("./routes/settings.routes"));

// History
app.use("/api/history", require("./routes/history.routes"));

// Tools
app.use("/api/password", require("./routes/password.routes"));
app.use("/api/hash", require("./routes/hash.routes"));
app.use("/api/crypto", require("./routes/crypto.routes"));
app.use("/api/urlscan", require("./routes/urlscan.routes"));
app.use("/api/portscan", require("./routes/portscan.routes"));
app.use("/api/whois", require("./routes/whois.routes"));
app.use("/api/virustotal", require("./routes/virustotal.routes"));
app.use("/api/pdf", require("./routes/pdf.routes"));

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  await seedAdmin();

  app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
  });
})();
