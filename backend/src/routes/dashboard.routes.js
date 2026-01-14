const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { authRequired } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/rbac.middleware");
const { getDashboardStats } = require("../controllers/dashboard.controller");

const router = express.Router();
router.get("/", authRequired, allowRoles("admin"), asyncHandler(getDashboardStats));
module.exports = router;
