const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

// 合法性校验
const expressJoi = require('../schemas//express-joi')
const { reg_schema } = require('../schemas/userSchema')

// 注册
router.post('/reg', expressJoi(reg_schema), userController.addUser)

// 登录
router.post('/login', userController.loginUser)

module.exports = router
