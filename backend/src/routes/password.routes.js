const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { checkPasswordStrength } = require("../controllers/password.controller");
const { authRequired } = require("../middlewares/auth.middleware");

const router = express.Router();
router.post("/check", authRequired, asyncHandler(checkPasswordStrength));
module.exports = router;
