const { response } = require('express');
const { Category } = require('../models');


// getCategories - paginated - total - populate
const getCategories = async (req, res = response) => {
    
    const { limit = 5, from = 0 } = req.query;
    const query = { active: true };
    
    const [total, categories] = await Promise.all([
        Category.countDocuments({ query }),
        Category.find({ query })
        .populate('user', 'name')
        .skip(Number(from))
        .limit(Number(limit))
    ]);
     
    res.json({
        total,
        categories
    });
    
}

// getCategoryById - populate 
const getCategoryById = async (req, res = response) => {
    
    const { id } = req.params;

    const category = await Category.findById( id ).populate('user', 'name');

    res.json(category);

}

// createCategory 
const createCategory = async (req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });

    if (categoryDB) {
        return res.status(400).json({
            msg: `Category ${categoryDB.name} already exists`
        });
    }

    // Generate data to save
    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data);

    // Save DB
    await category.save();

    res.status(201).json(category);

}

// Update category
const updateCategory = async (req, res = response) => {

    const { id } = req.params;
    const {active, user, ...data} = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate( id, data, {new: true});

    res.json(category);

}

// Delete category

const deleteCategory = async (req, res = response) => {
    
        const { id } = req.params;
    
        const category = await Category.findByIdAndUpdate( id, { active: false }, {new: true});
    
        res.json(category);
}


module.exports = {
    createCategory,
    getCategoryById,
    getCategories,
    updateCategory,
    deleteCategory
}