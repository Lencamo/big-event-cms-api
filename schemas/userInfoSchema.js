const joi = require('joi')

// 必传参数：id, nickname, emial 的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

const password = joi
  .string()
  .pattern(/^[\S]{6,15}$/)
  .required()

// 更新 - 用户基本资料
exports.updateUserInfo_schema = {
  body: {
    id,
    nickname,
    email
  }
}

// 更新 - 用户密码
exports.updatePassword_schema = {
  body: {
    // 使用 password 这个规则，验证 req.body.oldPwd 的值
    old_pwd: password,
    // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
    // 解读：
    // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
    // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
    // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
    new_pwd: joi.not(joi.ref('old_pwd')).concat(password)
  }
}
