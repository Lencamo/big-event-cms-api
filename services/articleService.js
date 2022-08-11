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

      res.codeMsg('发布文章成功！', 0)
    })
  },

  // 获取 - 文章列表：文章条数total
  getArticleTotal: (req, res) => {
    Pool.query(articleModel.countAll, function (err, rows) {
      if (err) return res.codeMsg(err)

      if (rows.length !== 1) return res.codeMsg('获取文章列表失败！')

      // console.log(rows[0].total)
      return rows[0].total
    })
  },

  // 获取 - 文章列表：获取数据
  getArticleList: (req, res) => {
    Pool.query(
      articleModel.selectListPro,
      [req.query.pagenum, req.query.pagesize],
      function (err, rows) {
        if (err) return res.codeMsg(err)

        res.send({
          code: 0,
          message: '获取文章列表成功！',
          total: rows[0].total,
          data: rows
        })
      }
    )
  }
}

module.exports = articleService
