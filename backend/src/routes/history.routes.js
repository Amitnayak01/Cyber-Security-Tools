const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { getHistory, clearHistory } = require("../controllers/history.controller");
const { authRequired } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authRequired, asyncHandler(getHistory));
router.delete("/", authRequired, asyncHandler(clearHistory));

module.exports = router;
