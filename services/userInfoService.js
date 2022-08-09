const { promisePool, Pool } = require('../models/db')

const userInfoModel = require('../models/userInfoModel')

// 导入 bcryptjs 加密包
const bcrypt = require('bcryptjs')

const userInfoService = {
  // 获取 - 用户基本资料
  getUserInfo: async (req, res) => {
    // id 值从登录成功后的经过解析后的🚩token对象user中获取（重点：user挂载在req对象上）
    // console.log(req.user) // 得知id值：req.user.data.id

    const result = await promisePool
      .query(userInfoModel.selectUserInfo, [req.user.data.id])
      .catch((err) => {
        return res.codeMsg(err)
      })

    // console.log(result[0])

    if (result[0].length !== 1) {
      return res.codeMsg('获取用户信息失败！')
    }

    // 获取成功提示
    res.send({
      code: 0,
      message: '获取用户基本信息成功！',
      data: result[0]
    })
  },

  // 更新-用户基本资料
  updateUserInfo: async (req, res) => {
    const result = await promisePool
      .query(userInfoModel.updateUserInfo, [req.body, req.body.id])
      .catch((err) => {
        return res.codeMsg(err)
      })

    if (result[0].affectedRows !== 1) {
      return res.codeMsg('修改用户基本信息失败！')
    }

    // 更新成功提示
    res.codeMsg('修改用户信息成功！', 0)
  },

  // 更新 - 用户密码：用户真实存在判断
  checkUserID: (req, res) => {
    Pool.query(
      userInfoModel.checkByID,
      [req.user.data.id],
      function (err, rows) {
        if (err) {
          return res.codeMsg(err)
        }

        if (rows.length !== 1) {
          return res.codeMsg('用户不存在！')
        }

        // 密码是否正确（使用✨bcrypt.compareSync()对密码进行比较）
        const compareResult = bcrypt.compareSync(
          req.body.old_pwd,
          rows[0].password
        )

        if (!compareResult) {
          return res.codeMsg('原密码错误！')
        }
      }
    )
  },

  // 更新 - 用户密码：更新新密码
  updatePassword: async (req, res) => {
    // 先使用✨bcrypt.hashSync()对新密码加密
    const new_pwd = bcrypt.hashSync(req.body.new_pwd, 10)

    // 然后更新密码
    const result = await promisePool
      .query(userInfoModel.updatePassword, [new_pwd, req.user.data.id])
      .catch((err) => {
        return res.codeMsg(err)
      })

    if (result[0].affectedRows !== 1) {
      return res.codeMsg('更新密码失败！')
    }

    // 更新成功提示
    res.codeMsg('更新密码成功', 0)
  }
}

module.exports = userInfoService
