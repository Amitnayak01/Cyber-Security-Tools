const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { authRequired } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/rbac.middleware");
const { listUsers, createUser, updateRole, deleteUser } = require("../controllers/admin.controller");

const router = express.Router();
router.get("/users", authRequired, allowRoles("admin"), asyncHandler(listUsers));
router.post("/users", authRequired, allowRoles("admin"), asyncHandler(createUser));
router.patch("/users/:id/role", authRequired, allowRoles("admin"), asyncHandler(updateRole));
router.delete("/users/:id", authRequired, allowRoles("admin"), asyncHandler(deleteUser));
module.exports = router;
