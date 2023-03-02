
const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validateFields, 
    validateJWT, 
    hasRole,
    adminRol 
} = require('../middlewares');

const { isValidRole, emailExist, userByIdExist } = require('../helpers/db-validators');

const { 
    getUsers, 
    putUsers, 
    postUsers,
    patchUsers,
    deleteUsers
} = require('../controller/users');


const router = Router();

    router.get('/', getUsers);

    router.put('/:id', [
        check('id', 'Is not a valid ID').isMongoId(),
        check('id').custom( userByIdExist ),
        check('role').custom( isValidRole ),
        validateFields
    ], putUsers);

    router.post('/',[
        check('mail', 'Mail is not valid').isEmail(),
        check('password', 'Password most have more than 6 letters').isLength({min: 6}),
        check('mail', 'Mail is not valid').isEmail(),
        check('mail').custom( emailExist ),
        // check('role', 'Role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom( isValidRole ),
        validateFields
    ], postUsers);
    
    
    router.delete('/:id',[
        validateJWT,
        // adminRol,
        hasRole('USER_ROLE', 'SALES_ROLE'),
        check('id', 'Is not a valid ID').isMongoId(),
        check('id').custom( userByIdExist ),
        validateFields
    ], deleteUsers);
    
    router.patch('/', patchUsers);

module.exports = router;