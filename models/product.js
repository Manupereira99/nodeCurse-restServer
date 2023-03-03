

const { Schema, model } = require('mongoose');

const ProductsSchema = Schema({
    name: {
        type:           String,
        required:       [true, 'name is required'],
        unique:         true
    },
    active: {
        type:           Boolean,
        default:        true,
        required:       true
    },
    user: {
        type:           Schema.Types.ObjectId,
        ref:            'User',
        required:       true
    },
    price: {
        type:           Number,
        default:        0
    },
    category: {
        type:           Schema.Types.ObjectId,
        ref:            'Category',
        require:        true,
    },
    description: { 
        type:           String 
    },
    available: { 
        type:           Boolean, 
        default:        true 
    },
    img:{
        type:           String
    }

});

ProductsSchema.methods.toJSON = function() {
    const { __v, active, ...products } = this.toObject();
    return products;
}

module.exports = model('Product', ProductsSchema);