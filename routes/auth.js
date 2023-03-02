const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controller/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login',[
    check('mail', 'Mail is obligatory').isEmail(),
    check('password', 'Password is obligatory').not().isEmpty(),
    validateFields
], login);

router.post('/google',[
    check('id_token', 'id token is required').not().isEmpty(),
    validateFields
], googleSignIn);


module.exports = router;