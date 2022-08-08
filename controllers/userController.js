const userService = require('../services/userService')

// 导入 bcryptjs 加密包
const bcrypt = require('bcryptjs')

// 注册
exports.addUser = (req, res) => {
  // 接收数据
  const { username, password } = req.body

  // 1、合法性校验
  // 1.1、（必传参数）
  // if (!username || !password) {
  //   return res.codeMsg('用户名或密码不能为空')
  // }

  // 2、用户名是否被占用
  userService.checkUser(username, res)

  // 3、插入新用户
  // 3.1、（使用✨bcrypt.hashSync()对密码加密）
  const encryptPassword = bcrypt.hashSync(password, 10)
  // console.log(encryptPassword)

  userService.addUser(username, encryptPassword, res)
}

// 登录
exports.loginUser = (req, res) => {
  // 接收数据
  const { username, password } = req.body

  // 1、用户登录
  userService.loginUser(username, password, res)

  // res.send('login ok')
}
