const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { scanUrlController } = require("../controllers/urlscan.controller");
const { scannerLimiter } = require("../middlewares/rateLimiter.middleware");
const { authRequired } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/rbac.middleware");

const router = express.Router();
router.post("/", authRequired, allowRoles("analyst","admin"), scannerLimiter, asyncHandler(scanUrlController));
module.exports = router;
