var express = require('express')
var router = express.Router()

const userInfoController = require('../controllers/userInfoController')

// 1、获取-用户基本资料
router.get('/userinfo', userInfoController.getUserInfo)

// 2、更新-用户基本资料

// 3、更新-用户头像

// 4、更新-用户密码

module.exports = router
