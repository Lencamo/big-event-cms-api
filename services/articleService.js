const { Pool } = require('../models/db')

const articleModel = require('../models/articleModel')

const path = require('path')

const articleService = {
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
  }
}

module.exports = articleService
