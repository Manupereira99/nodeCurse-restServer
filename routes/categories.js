const { Router } = require('express');
const { check } = require('express-validator');

const { 
    createCategory, 
    getCategoryById, 
    getCategories, 
    updateCategory,
    deleteCategory
} = require('../controller/categories');
const { existCategoryById, isValidRole } = require('../helpers/db-validators');

const { 
    validateJWT, 
    validateFields 
} = require('../middlewares');

const router = Router();

// getCategories - paginated - total - populate
router.get('/', getCategories);

// Obtain one category by id - public
router.get('/:id',[
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom( existCategoryById ),
    validateFields
], getCategoryById);

 
// Create category - private - any person with a valid token
router.post('/',[ 
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
    validateFields 
], createCategory);

//Update category - private - any person with a valid token
router.put('/:id',[
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
    check('id').custom( existCategoryById ),
    validateFields
], updateCategory);

//Logic delete category - private - any person with a valid token
router.delete('/:id',[
    validateJWT,
    // isValidRole,
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom( existCategoryById ),
    validateFields
] ,deleteCategory);




module.exports = router;