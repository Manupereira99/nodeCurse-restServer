const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/google-verify');



const login = async (req, res = response ) =>{

    const { mail, password } = req.body;

    try {

        // Verify if the email exists
        const user = await User.findOne({ mail });
        
        if (!user) {
            return res.status(400).json({
                msg: 'Email / Password are not correct - email'
            })
        }

        // Verify if the user is active
        if (!user.active) {
            return res.status(400).json({
                msg: 'Email / Password are not correct - false'
            })
        }

        // Verify the password
        const validPassword = bcryptjs.compareSync( password, user.password );
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Email / Password are not correct - password'
            })
        }

        // Generate JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the admin'
        })
    }

}

const googleSignIn = async (req, res = response ) =>{

    const { id_token } = req.body;

    try {

        const { name, mail, picture } = await googleVerify( id_token );

        let user = await User.findOne({ mail });

        if (!user) {
            // Create a new user
            const data = {
                name,
                mail,
                password: ':P',
                role: 'USER_ROLE',
                picture,
                google: true
            }

            user = new User( data );

            await user.save();
        }

        // If the user is not active
        if (!user.active) {
            return res.status(401).json({
                msg: 'Talk to the admin, user blocked'
            })
        }

        // Generate JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the admin'
        })
    }


}

module.exports = {
    login,
    googleSignIn
}