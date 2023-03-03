const { Router } = require('express');
const { check } = require('express-validator');
const { loadFile, updateImage, showImage } = require('../controller/uploads');
const { allowedCollections } = require('../helpers/db-validators');

const { validateFields, validateUploadFile } = require('../middlewares/');

const router = Router();

router.post('/', validateUploadFile, loadFile);

router.put('/:collection/:id',[
    validateUploadFile,
    check('id', 'The id is not valid').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products'])),
    validateFields
], updateImage);

router.get('/:collection/:id', [
    check('id', 'The id is not valid').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products'])),
    validateFields
], showImage )



module.exports = router;