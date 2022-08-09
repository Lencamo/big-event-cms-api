var express = require('express')
var router = express.Router()

const userInfoController = require('../controllers/userInfoController')

// 合法性校验
const expressJoi = require('../schemas//express-joi')
const {
  updateUserInfo_schema,
  updatePassword_schema,
  updateAvatar_schema
} = require('../schemas/userInfoSchema')

// 1、获取-用户基本资料
router.get('/userinfo', userInfoController.getUserInfo)

// 2、更新-用户基本资料
router.put(
  '/userinfo',
  expressJoi(updateUserInfo_schema),
  userInfoController.updateUserInfo
)

// 3、更新-用户密码
router.patch(
  '/updatepwd',
  expressJoi(updatePassword_schema),
  userInfoController.updatePassword
)

// 4、更新-用户头像
router.patch(
  '/update/avatar',
  expressJoi(updateAvatar_schema),
  userInfoController.updateAvatar
)

module.exports = router
