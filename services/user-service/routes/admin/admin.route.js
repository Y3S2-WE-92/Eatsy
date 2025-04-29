const express = require("express");
const router = express.Router();
const { register, login, getAllAdmins, getAdminByID } = require("../../controllers/admin/admin.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/", getAllAdmins);
router.get("/:id", getAdminByID);

module.exports = router;