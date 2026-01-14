const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { generateHash } = require("../controllers/hash.controller");
const { authRequired } = require("../middlewares/auth.middleware");

const router = express.Router();
router.post("/generate", authRequired, asyncHandler(generateHash));
module.exports = router;
