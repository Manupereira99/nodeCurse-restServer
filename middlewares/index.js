

const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const validateRols = require('../middlewares/validate-rols');
const validateUploadFile = require('../middlewares/validate-file');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRols,
    ...validateUploadFile
}