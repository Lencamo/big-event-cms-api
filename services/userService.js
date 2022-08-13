const { promisePool, Pool } = require('../models/db')

const userModel = require('../models/userModel')

const JWT = require('../utils/JWT')

// 导入 bcryptjs 加密包
const bcrypt = require('bcryptjs')

const userService = {
  // 用户名是否被占用（同步方式演示）
  checkUser: (username, res) => {
    Pool.query(userModel.checkByUsername, [username], function (err, rows) {
      if (err) {
        // return res.send({ code: 1, message: err.message })
        return res.codeMsg(err)
      }

      if (rows.length > 0) {
        // return resp.send({ code: 1, message: '用户名被占用，请更换其他用户名！' })
        return res.codeMsg('用户名被占用，请更换其他用户名！')
      }
    })
  },

  // 插入新用户
  addUser: (username, password, res) => {
    Pool.query(
      userModel.addUser,
      [{ username: username, password: password }],
      function (err, rows) {
        if (err) {
          return res.codeMsg(err)
        }

        if (rows.affectedRows !== 1) {
          return res.codeMsg('注册用户失败，请稍后再试！')
        }

        // 注册成功提示
        // res.send({ code: 0, message: '注册成功！' })
        return res.codeMsg('注册成功！', 0)
      }
    )
  },

  // 用户登录
  loginUser: (username, password, res) => {
    Pool.query(userModel.checkByUsername, [username], function (err, rows) {
      if (err) {
        return res.codeMsg(err)
      }

      // 用户是否存在
      if (rows.length !== 1) {
        return res.codeMsg('用户名不存在！')
      }

      // 密码是否正确（使用✨bcrypt.compareSync()对密码进行比较）
      const compareResult = bcrypt.compareSync(password, rows[0].password)

      if (!compareResult) {
        return res.codeMsg('密码错误！')
      }

      // 🚩设置token签名
      // 1、生成token
      const user = { ...rows[0], password: '', user_pic: '' } // 利用展开运算符的方式排出密码、照片等敏感信息
      const tokenStr = JWT.generate(user)

      // 2、发送token到客户端（header方式）
      // res.header('Authorization', token)
      return res.send({
        code: 0,
        message: '登录成功',
        token: 'Bearer ' + tokenStr
      })

      // 登录成功
      // res.codeMsg('登录成功', 0)
    })
  }
}

module.exports = userService
