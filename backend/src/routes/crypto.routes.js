const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { encryptText, decryptText } = require("../controllers/crypto.controller");
const { authRequired } = require("../middlewares/auth.middleware");

const router = express.Router();
router.post("/encrypt", authRequired, asyncHandler(encryptText));
router.post("/decrypt", authRequired, asyncHandler(decryptText));
module.exports = router;
