const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { authRequired } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/rbac.middleware");
const { getSettings, updateSetting } = require("../controllers/settings.controller");

const router = express.Router();
router.get("/", authRequired, allowRoles("admin"), asyncHandler(getSettings));
router.put("/", authRequired, allowRoles("admin"), asyncHandler(updateSetting));
module.exports = router;
