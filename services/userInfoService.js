const { promisePool } = require('../models/db')

const userInfoModel = require('../models/userInfoModel')

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
  }
}

module.exports = userInfoService
