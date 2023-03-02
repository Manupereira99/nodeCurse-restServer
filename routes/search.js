const { Router } = require('express')
const { searchs } = require('../controller/search')

const router = Router()

router.get('/:collection/:term', searchs)




module.exports = router