const express = require("express");
const router = express.Router();
const {createPayback, completePayback, getPaybacks, getPaybackByOrderId, getPaybackByReceiverId} = require("../controllers/payback.controller.js");

router.post("/", createPayback);
router.post("/complete", completePayback);
router.get("/", getPaybacks);
router.get("/receiver/:type/:id", getPaybackByReceiverId);
router.get("/:id", getPaybackByOrderId);

module.exports = router;
