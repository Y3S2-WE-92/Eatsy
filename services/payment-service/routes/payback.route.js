const express = require("express");
const router = express.Router();
const {createPayback, getPaybacks, getPaybackByOrderId} = require("../controllers/payback.controller.js");

router.post("/", createPayback);
router.get("/", getPaybacks);
router.get("/:id", getPaybackByOrderId);

module.exports = router;
