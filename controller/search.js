const { ObjectId } =require('mongoose').Types;

const { User, Category, Product } = require('../models');

const availableCollections = [
    'users',
    'categories',
    'products',
    'roles'
]

const userSearch = async (term = '', res = response) => {

    const isMongoID = ObjectId.isValid(term);

    if (isMongoID){
        const user = await User.findById(term);
        return res.json({
            results: (user) ? [user] : []
        })
    }

    const regex = new RegExp(term, 'i');

    const users = await User.find({ 
        $or: [{ name: regex }, { mail: regex }],
        $and: [{ active: true }]
    });
    
    res.json({
        results: users
    })
}


const categoriesSearch = async (term = '', res = response) => {

    const isMongoID = ObjectId.isValid(term);

    if (isMongoID){
        const categories = await Category.findById(term);
        return res.json({
            results: (categories) ? [categories] : []
        })
    }

    const regex = new RegExp(term, 'i');

    const categories = await Category.find({ name: regex, active: true});
    
    res.json({
        results: categories
    })
}

const productsSearch = async (term = '', res = response) => {

    const isMongoID = ObjectId.isValid(term);

    if (isMongoID){
        const products = await Product.findById(term).populate('category', 'name');
        return res.json({
            results: (products) ? [products] : []
        })
    }

    const regex = new RegExp(term, 'i');

    const products = await Product.find({ name: regex, active: true}).populate('category', 'name');
    
    res.json({
        results: products
    })
}


const searchs = (req, res) => {

    const { collection, term } = req.params;

    if (!availableCollections.includes(collection)) {
        return res.status(400).json({
            msg: `The collections allowed are: ${availableCollections}`
        })
    }

    switch (collection){

        case 'users':
            userSearch(term, res);
        break;

        case 'categories':
            categoriesSearch(term, res);
        break;

        case 'products':
            productsSearch(term, res);
        break;

        default:
            res.status(500).json({
                msg: 'I forgot to do this search'
            })
        
    }

}

module.exports = {
    searchs
}