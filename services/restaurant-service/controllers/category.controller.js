const Category = require("../models/category.model");

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCategoryByID = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllCategories,
    createCategory,
    getCategoryByID
};