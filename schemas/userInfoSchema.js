const joi = require('joi')

// 必传参数：id, nickname, emial 的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

// 更新 - 用户基本资料
exports.updateUserInfo_schema = {
  body: {
    id,
    nickname,
    email
  }
}
