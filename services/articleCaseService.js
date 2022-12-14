const { Pool } = require('../models/db')

const articleCaseModel = require('../models/articleCaseModel')

const articleCaseService = {
  // 获取 - 文章分类
  getArtCateList: (req, res) => {
    Pool.query(articleCaseModel.selectAllCase, function (err, rows) {
      if (err) {
        return res.codeMsg(err)
      }

      return res.send({
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

        // 1、分类名称 和 分类别名 都被占用
        if (rows.length === 2) return res.codeMsg('此分类已存在1！')

        if (
          rows.length === 1 &&
          rows[0].cate_name === req.body.cate_name &&
          rows[0].cate_alias === req.body.cate_alias
        ) {
          // 处理已删除过的文章类名✨
          Pool.query(
            articleCaseModel.addCasePro,
            [req.body.cate_name, req.body.cate_alias],
            function (err, rows) {
              if (err) return res.codeMsg(err)

              if (rows.affectedRows !== 1) {
                return res.codeMsg('新增文章分类失败！')
              }
            }
          )
          return res.codeMsg('新增文章分类成功！', 0)
          // return res.codeMsg('此分类已存在2！')
        }

        // 2、分类名称 或 分类别名 被占用
        if (rows.length === 1 && rows[0].cate_name === req.body.cate_name)
          return res.codeMsg('此分类已存在3！')

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

      return res.codeMsg('新增文章分类成功！', 0)
    })
  },

  // 删除 - 文章分类：分类是否存在
  checkCateById: (req, res) => {
    Pool.query(
      articleCaseModel.checkById,
      [req.query.id],
      function (err, rows) {
        if (err) return res.codeMsg(err)

        if (rows.length === 0) {
          return res.codeMsg('要删除的分类不存在！')
        }
      }
    )
  },

  // 删除 - 文章分类：删除文章分类
  delArtCateList: (req, res) => {
    Pool.query(articleCaseModel.delCase, [req.query.id], function (err, rows) {
      if (err) return res.codeMsg(err)

      if (rows.affectedRows !== 1) return res.codeMsg('删除文章分类失败！')

      return res.codeMsg('删除文章分类成功！', 0)
    })
  },

  // 获取 - 文章分类详情
  getArticleDetail: (req, res) => {
    Pool.query(
      articleCaseModel.selectById,
      [req.query.id],
      function (err, rows) {
        if (err) return res.codeMsg(err)

        console.log(rows)
        if (rows.length !== 1) return res.codeMsg('获取文章分类数据失败！')

        return res.send({
          code: 0,
          message: '获取文章分类成功！',
          data: rows[0]
        })
      }
    )
  },

  // 更新 - 文章分类：查重
  checkArtCateAll: (req, res) => {
    Pool.query(
      articleCaseModel.selectCheckAll,
      [req.body.id, req.body.cate_name, req.body.cate_alias],
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

  // 更新 - 文章分类：更新到数据库
  updateCate: (req, res) => {
    Pool.query(
      articleCaseModel.updateCase,
      [req.body, req.body.id],
      function (err, rows) {
        if (err) return res.codeMsg(err)

        if (rows.affectedRows !== 1) return res.codeMsg('更新分类信息失败！')

        return res.codeMsg('更新分类信息成功！', 0)
      }
    )
  }
}

module.exports = articleCaseService
