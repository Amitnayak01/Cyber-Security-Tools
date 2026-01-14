const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { login, me, refresh, logout } = require("../controllers/auth.controller");
const { authRequired } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/login", asyncHandler(login));
router.post("/refresh", asyncHandler(refresh));
router.post("/logout", asyncHandler(logout));
router.get("/me", authRequired, asyncHandler(me));

module.exports = router;
