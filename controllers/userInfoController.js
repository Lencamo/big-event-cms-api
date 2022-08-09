const userInfoService = require('../services/userInfoService')

// 获取 - 用户基本资料
exports.getUserInfo = (req, res) => {
  userInfoService.getUserInfo(req, res)
}

// 更新 - 用户基本资料
exports.updateUserInfo = (req, res) => {
  userInfoService.updateUserInfo(req, res)
}

// 更新 - 用户密码
exports.updatePassword = (req, res) => {
  // 1、密码属于敏感信息
  // - 要确保该用户真实存在（根据id）
  // - 要确保旧密码的正确性
  userInfoService.checkUserID(req, res)

  // 2、数据库中更新新密码
  userInfoService.updatePassword(req, res)
}

// 更新-用户头像
exports.updateAvatar = (req, res) => {
  userInfoService.updateAvatar(req, res)

  // res.codeMsg('ok')
}
