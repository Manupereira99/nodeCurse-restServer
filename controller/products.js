const { response } = require('express');
const { body } = require('express-validator');
const { Product } = require('../models');


// getProducts - paginated - total populate
const getProducts = async (req, res = response) => {
    
    const { limit = 5, from = 0 } = req.query;
    const query = { active: true };
    
    const [total, products] = await Promise.all([
        Product.countDocuments({ query }),
        Product.find({ query })
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);
     
    res.json({
        total,
        products
    });
    
}

// getProductById - populate 
const getProductById = async (req, res) => {
    
    const { id } = req.params;
            
        const product = await Product.findById( id ).populate('user', 'name').populate('category', 'name');

    res.json(product);

}


// createProduct 
const createProduct = async (req, res) =>{

    const {active, user, ...body} = req.body;

    const productDB = await Product.findOne({name: body.name})


    if (productDB) {
        return res.status(400).json({
            msg: `Product ${productDB.name} already exists`
        });
    }

    // Generate data to save
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }

    const product = new Product(data);

    // Save DB
    await product.save();

    res.status(201).json(product);
}

// Update product
const updateProduct = async (req, res = response) => {

    const { id } = req.params;
    const {active, user, ...data} = req.body;

    if (data.name){
        data.name = data.name.toUpperCase();
    }
    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate( id, data, {new: true});

    res.json(product);

}

const deleteProduct = async (req, res ) => {
    
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate( id, { active: false }, {new: true});

    res.json(product);
}


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}