const { Pool } = require('../models/db')

const articleModel = require('../models/articleModel')

const path = require('path')

const articleService = {
  // 发布 - 文章
  uploadArticle: (req, res) => {
    const articleInfo = {
      // 标题、内容、状态、所属的分类Id
      ...req.body,
      // 文章封面在服务器端的存放路径
      cover_img: path.join('/public/uploads', req.file.filename),
      // 文章发布时间
      pub_date: new Date(),
      // 文章作者的Id
      author_id: req.user.data.id
    }
    Pool.query(articleModel.insertArticle, articleInfo, function (err, rows) {
      if (err) return res.codeMsg(err)

      if (rows.affectedRows !== 1) return res.codeMsg('发布文章失败！')

      return res.codeMsg('发布文章成功！', 0)
    })
  },

  // 获取 - 文章列表：文章条数total
  getArticleTotal: (req, res) => {
    Pool.query(articleModel.countAll, function (err, rows) {
      if (err) return res.codeMsg(err)

      if (rows.length !== 1) return res.codeMsg('获取文章列表失败！')

      // console.log(rows[0].total)
      // return rows[0].total
    })
  },

  // 获取 - 文章列表：获取数据（附加筛选功能✨）
  getArticleList: (req, res) => {
    // 当前页的第一个索引值
    const pageIndex = (req.query.pagenum - 1) * req.query.pagesize

    Pool.query(
      articleModel.selectListPro(req, res),
      [pageIndex, req.query.pagesize],
      function (err, rows) {
        if (err) return res.codeMsg(err)

        var total = 0
        if (rows.length === 0) {
          total = 0
        } else {
          total = rows[0].total
        }

        return res.send({
          code: 0,
          message: '获取文章列表成功！',
          total: total,
          data: rows
        })
      }
    )
  },

  // 获取 - 文章详情
  getArticleDetail: (req, res) => {
    Pool.query(
      articleModel.selectArtById,
      [req.query.id],
      function (err, rows) {
        if (err) return res.codeMsg(err)

        if (rows.length !== 1) return res.codeMsg('没有查到对应的数据！')

        return res.send({
          code: 0,
          message: '获取文章成功！',
          data: rows[0]
        })
      }
    )
  },

  // 删除 - 文章
  delArticle: (req, res) => {
    Pool.query(articleModel.delArticle, [req.query.id], function (err, rows) {
      if (err) return res.codeMsg(err)

      if (rows.affectedRows !== 1) return res.codeMsg('您要删除的文章不存在！')

      return res.codeMsg('删除成功！', 0)
    })
  }
}

module.exports = articleService
