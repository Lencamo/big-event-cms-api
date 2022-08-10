const { Pool } = require('../models/db')

const articleCaseModel = require('../models/articleCaseModel')

const articleCaseService = {
  // 获取 - 文章分类
  getArtCateList: (req, res) => {
    Pool.query(articleCaseModel.selectAllCase, function (err, rows) {
      if (err) {
        return res.codeMsg(err)
      }

      res.send({
        code: 0,
        message: '获取文章分类列表成功！',
        data: rows
      })
    })
  }
}

module.exports = articleCaseService
