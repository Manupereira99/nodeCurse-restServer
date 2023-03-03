const { Router } = require('express');
const { check } = require('express-validator');
const { loadFile } = require('../controller/uploads');

const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/',  loadFile);



module.exports = router;