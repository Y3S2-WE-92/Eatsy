const express = require('express');
const router = express.Router();
const { getAllCategories, createCategory, getCategoryByID } = require('../controllers/category.controller');

router.get('/', getAllCategories);
router.post('/', createCategory);
router.get('/:id', getCategoryByID);

module.exports = router;