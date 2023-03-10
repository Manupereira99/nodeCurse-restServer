
const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type:     String,
        required: [true, 'name is required'],
        unique:   true
    },
    active: {
        type:     Boolean,
        default:  true,
        required: true
    },
    user: {
        type:      Schema.Types.ObjectId,
        ref:       'User',
        required:  true
    }
});

CategorySchema.methods.toJSON = function() {
    const { __v, active, ...category } = this.toObject();
    return category;
}

module.exports = model('Category', CategorySchema);