const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { whoisLookup } = require("../controllers/whois.controller");
const { authRequired } = require("../middlewares/auth.middleware");
const { scannerLimiter } = require("../middlewares/rateLimiter.middleware");
const { allowRoles } = require("../middlewares/rbac.middleware");

const router = express.Router();
router.post("/", authRequired, allowRoles("analyst","admin"), scannerLimiter, asyncHandler(whoisLookup));
module.exports = router;
