const {Schema, model} = require('mongoose');

const UserSchema = Schema ({
    name: {
        type: String,
        required: [true, 'Name is obligatory']
    },
    mail: {
        type: String,
        require: [true, 'Mail is obligatory'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is obligatory']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },    
    active:{
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

UserSchema.methods.toJSON = function() {
    const {__v, password, ...user} = this.toObject();
    return user;
}

module.exports = model( 'User', UserSchema);

