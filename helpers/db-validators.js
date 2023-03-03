
const Role = require('../models/role');
const {User,Category, Product } = require('../models');



const isValidRole = async (role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
        throw new Error(`Role ${role} is not registered in DB`);
    }
};

const emailExist = async ( mail = '') => { 
    
    // Verify if mail exist 
    const existMail = await User.findOne({mail});
        if (existMail) {
            throw new Error(`Mail ${mail} is already registered`);
        };
};

const userByIdExist = async ( id = '') => { 
    // Verify if mail exist 
    const existUser = await User.findById(id);
        if (!existUser) {
            throw new Error(`Id ${id} does not exist`);
        };
};

// CATEGORIES
const existCategoryById = async ( id ) => { 

    // Verify if mail exist 
    const existCategory = await Category.findById(id);
        if (!existCategory) {
            throw new Error(`Id ${id} does not exist`);
    };
};

//PRODUCTS
const existProductById = async ( id ) => { 

    // Verify if mail exist 
    const existProduct = await Product.findById(id);
        if (!existProduct) {
            throw new Error(`Id ${id} does not exist`);
    };
};

// Validate allowed collections
const allowedCollections = ( collection = '', collections = []) => {

    const include = collections.includes(collection);
    if (!include) {
        throw new Error(`Collection ${collection} is not allowed, ${collections}`);
    }

    return true;

}


module.exports = {
    isValidRole,
    emailExist,
    userByIdExist,
    existCategoryById,
    existProductById,
    allowedCollections
};