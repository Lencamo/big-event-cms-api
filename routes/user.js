const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

// 注册
router.post('/reg', userController.addUser)

// 登录
router.post('/login', userController.loginUser)

module.exports = router
