const express = require("express");
const router = express.Router();
const {getCommissionSetting, createCommissionSetting, updateCommissionSetting} = require("../controllers/commissionSetting.controller.js");

router.get("/", getCommissionSetting);
router.post("/", createCommissionSetting);
router.put("/update", updateCommissionSetting);

module.exports = router;
