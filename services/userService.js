const { promisePool, Pool } = require('../models/db')

const userModel = require('../models/userModel')

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

  // 插入新用户（异步方式演示）
  addUser: async (username, password, res) => {
    const result = await promisePool
      .query(userModel.addUser, [{ username: username, password: password }])
      .catch((err) => {
        return res.codeMsg(err)
      })
    // console.log(result[0])
    if (result[0].affectedRows !== 1) {
      return res.codeMsg('注册用户失败，请稍后再试！')
    }

    // 注册成功提示
    // res.send({ code: 0, message: '注册成功！' })
    res.codeMsg('注册成功！', 0)
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

      // 登录成功
      res.codeMsg('登录成功', 0)
    })
  }
}

module.exports = userService
