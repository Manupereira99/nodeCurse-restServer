const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const getUsers = async (req, res = response ) =>{

    const { limit = 5, from = 0} = req.query;
    const query = {active: true};

    // const users = await User.find( query )
    //     .skip(Number(from))
    //     .limit(Number(limit))

    // const total = await User.countDocuments( query );

    const [total, users] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip(Number(from))
            .limit(Number(limit))
    ]);


    res.json({
        total,
        users,
    });
}

const postUsers = async (req, res) =>{

    const {name, mail, password, role} = req.body;
    const user = new User( {name, mail, password, role} );

    // Crypt the password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Save in db
    await user.save();

    res.json({
        user
    })
}

const putUsers = async (req, res) =>{

    const { id } = req.params;
    const { _id, password, google, mail, ...rest } = req.body;

    if ( password ) {
        // Crypt the password
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    console.log(id)

    const user = await User.findByIdAndUpdate( id, rest);


    res.json(user)
}

const patchUsers = (req, res) =>{
    res.status(403).json({
        msg: 'patch API - controller'
    })
}

const deleteUsers = async (req, res) =>{

    const { id } = req.params;

    // Delete from db fisically
    // const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, {active: false} );

    res.json({
        user
    })
}


module.exports = {
    getUsers,
    putUsers,
    postUsers,
    patchUsers,
    deleteUsers
};