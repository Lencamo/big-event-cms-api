const jwt = require('jsonwebtoken')

const { jwtSecretKey, expires } = require('../config/jwt.config')

const JWT = {
  // 1、生成token字符串
  generate(value) {
    // 使用sign函数
    return jwt.sign(
      {
        // data: '<数据>'
        data: value
      },
      jwtSecretKey,
      {
        // expiresIn: '<有效期>'
        expiresIn: expires
      }
    )
  },

  // 2、解密数据（注意👀：为了演示express-jwt包的使用，后续我们不会使用verify()方法）
  verify(token) {
    try {
      return jwt.verify(token, jwtSecretKey)
    } catch (error) {
      return false
    }
  }
}

module.exports = JWT
