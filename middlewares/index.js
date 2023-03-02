

const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const validateRols = require('../middlewares/validate-rols');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRols
}