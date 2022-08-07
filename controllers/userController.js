const userService = require('../services/userService')

// 导入 bcryptjs 加密包
const bcrypt = require('bcryptjs')

// 1、注册
exports.addUser = (req, res) => {
  // 接收数据
  const { username, password } = req.body

  // 1、合法性校验（必传参数）
  if (!username || !password) {
    return res.send({ code: 1, message: '用户名或密码不能为空' })
  }

  // 2、用户名是否被占用
  userService.checkUser(username, password, res)

  // 3、插入新用户
  // 3.1、对密码加密
  const encryptPassword = bcrypt.hashSync(password, 10)
  // console.log(encryptPassword)

  userService.addUser(username, encryptPassword, res)
}

// 2、登录
exports.loginUser = (req, res) => {
  res.send('login ok')
}
