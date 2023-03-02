const jwt = require( 'jsonwebtoken' );
const {response , request} = require( 'express' );

const User = require( '../models/user' );


const validateJWT = async ( req = request , res = response , next ) => {

    // Read the token
    const token = req.header( 'x-token' );
    if ( ! token ) {
        return res.status( 401 ).json({
            msg: 'There is no token in the request'
        });
    }
    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // Read the user from db
        const user = await User.findById( uid );

        if ( ! user ) {
            return res.status( 401 ).json({
                msg: 'Token not valid - user does not exist in db'
            })
        }

        // Verify if user exists
        if (!user.active){
            return res.status( 401 ).json({
                msg: 'Token not valid - user with status: false'
            })
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status( 401 ).json({
            msg: 'Token not valid'
        })
    }
}

module . exports = {
    validateJWT
}