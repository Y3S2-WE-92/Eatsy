const express = require("express");
const router = express.Router();
const { saveCard, getSavedCards, deleteCard } = require("../controllers/card.controller.js");

router.post("/save", saveCard);
router.get("/user/:userId", getSavedCards);
router.delete("/:id", deleteCard);

module.exports = router;
