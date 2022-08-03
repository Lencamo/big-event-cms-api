var express = require('express')
var router = express.Router()

const demoController = require('../controllers/demoController')

router.get('/', demoController.show)

module.exports = router
