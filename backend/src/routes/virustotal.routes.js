const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { scanUrlVirusTotal } = require("../controllers/virustotal.controller");
const { authRequired } = require("../middlewares/auth.middleware");
const { scannerLimiter } = require("../middlewares/rateLimiter.middleware");
const { allowRoles } = require("../middlewares/rbac.middleware");

const router = express.Router();
router.post("/url", authRequired, allowRoles("analyst","admin"), scannerLimiter, asyncHandler(scanUrlVirusTotal));
module.exports = router;
