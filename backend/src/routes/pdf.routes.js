const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { generatePdf } = require("../controllers/pdf.controller");
const { authRequired } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/rbac.middleware");

const router = express.Router();
router.post("/", authRequired, allowRoles("analyst","admin"), asyncHandler(generatePdf));
module.exports = router;
