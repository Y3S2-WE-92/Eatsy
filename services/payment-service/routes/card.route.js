const express = require("express");
const router = express.Router();
const { saveCard, getSavedCards, updateCard, deleteCard } = require("../controllers/card.controller.js");

router.post("/save", saveCard);
router.get("/user/:userId", getSavedCards);
router.put("/:id", updateCard);
router.delete("/:id", deleteCard);

module.exports = router;
