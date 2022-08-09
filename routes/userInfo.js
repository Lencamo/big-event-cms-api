var express = require('express')
var router = express.Router()

const userInfoController = require('../controllers/userInfoController')

// 合法性校验
const expressJoi = require('../schemas//express-joi')
const { updateUserInfo_schema } = require('../schemas/userInfoSchema')

// 1、获取-用户基本资料
router.get('/userinfo', userInfoController.getUserInfo)

// 2、更新-用户基本资料
router.put(
  '/userinfo',
  expressJoi(updateUserInfo_schema),
  userInfoController.updateUserInfo
)

// 3、更新-用户头像

// 4、更新-用户密码

module.exports = router
