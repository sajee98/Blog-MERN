const express = require('express');
const router = express.Router();
const Category = require('../models/Category');


// Get all categories API
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get sinle category by id api
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new category API
router.post('/', async (req, res) => {
    console.log("Incoming data:", req.body); // Add this
    const category = new Category({
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description || '', // Option
        createdAt: Date.now(), 
    });

    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Update a category api
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id) 
        if (!category) {
            return res.status(404).json({ message: 'category not found' });
        }
        category.name = req.body.name || category.name;
        category.slug = req.body.slug || category.slug;
        category.description = req.body.description || category.description;
        category.updatedAt = Date.now();

        const updatedCategory = await category.save();
        res.status(200).json(updatedCategory);
       
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Delete a category api
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'category not found' });
        }
    //    await Post.deleteOne({ _id: req.params.id });
        await Category.findByIdAndDelete(category._id);
        res.status(200).json({ message: 'category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;