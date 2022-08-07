const { promisePool, Pool } = require('../models/db')

const userModel = require('../models/userModel')

const userService = {
  // 用户名是否被占用（同步方式演示）
  checkUser: (username, res) => {
    Pool.query(userModel.checkByUsername, [username], function (err, rows) {
      if (err) {
        return res.send({ status: 1, message: err.message })
      }
      if (rows.length > 0) {
        return res.send({
          status: 1,
          message: '用户名被占用，请更换其他用户名！'
        })
      }
    })
  },

  // 插入新用户（异步方式演示）
  addUser: async (username, password, res) => {
    const [rows, fields] = await promisePool
      .query(userModel.addUser, [{ username: username, password: password }])
      .catch((err) => {
        return res.send({ code: 1, message: err.message })
      })
    // console.log(rows.length)
    if (rows.length > 0) {
      return res.send({ code: 1, message: '注册用户失败，请稍后再试！' })
    }

    // 注册成功提示
    res.send({
      code: 0,
      message: '注册成功！'
    })
  }
}

module.exports = userService
