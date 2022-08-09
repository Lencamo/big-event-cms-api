const userInfoService = require('../services/userInfoService')

// 获取 - 用户基本资料
exports.getUserInfo = (req, res) => {
  userInfoService.getUserInfo(req, res)
}
