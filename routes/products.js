const { Router } = require('express');
const { check } = require('express-validator');

const { 
    createProduct, 
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controller/products')

const {
isValidRole, existProductById, existCategoryById
} = require('../helpers/db-validators')

const { validateFields, validateJWT } = require('../middlewares');

const router = Router();

// getProducts - paginated - total - populate
router.get('/', getProducts);

// Obtain one category by id - public
router.get('/:id',[
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom( existProductById ),
    validateFields
], getProductById);

// Create category - private - any person with a valid token
router.post('/',[ 
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
    check('category', 'is not a valid Mongo ID').isMongoId(),
    check('category').custom( existCategoryById ),
    validateFields
], createProduct);

//Update category - private - any person with a valid token
router.put('/:id',[
    validateJWT,
    // check('category', 'is not a valid Mongo ID').isMongoId(),
    check('id').custom( existProductById ),
    validateFields
], updateProduct);

//Logic delete category - private - any person with a valid token
router.delete('/:id',[
    validateJWT,
    // isValidRole,
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom( existProductById ),
    validateFields
] ,deleteProduct);

module.exports = router;