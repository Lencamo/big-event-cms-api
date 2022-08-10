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
  },

  // 增加 - 文章分类：查重
  checkArtCate: (req, res) => {
    Pool.query(
      articleCaseModel.selectCheck,
      [req.body.cate_name, req.body.cate_alias],
      function (err, rows) {
        if (err) return res.codeMsg(err)

        // 分类名称 和 分类别名 都被占用
        if (rows.length === 2) return res.codeMsg('此分类已存在！')

        if (
          rows.length === 1 &&
          rows[0].cate_name === req.body.cate_name &&
          rows[0].cate_alias === req.body.cate_alias
        ) {
          return res.codeMsg('此分类已存在！')
        }

        // 分类名称 或 分类别名 被占用
        if (rows.length === 1 && rows[0].cate_name === req.body.cate_name)
          return res.codeMsg('此分类已存在！')

        if (rows.length === 1 && rows[0].cate_alias === req.body.cate_alias)
          return res.codeMsg('分类别名被占用，请更换后重试！')
      }
    )
  },

  // 增加 - 文章分类：添加到数据库
  addArtCate: (req, res) => {
    Pool.query(articleCaseModel.addCase, [req.body], function (err, rows) {
      if (err) return res.codeMsg(err)

      if (rows.affectedRows !== 1) return res.codeMsg('新增文章分类失败！')

      res.codeMsg('新增文章分类成功！', 0)
    })
  }
}

module.exports = articleCaseService
