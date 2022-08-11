const articleService = require('../services/articleService')

// 发布 - 文章
exports.uploadArticle = (req, res) => {
  // 1、文章封面是否存在（校验schema）
  if (!req.file || req.file.fieldname !== 'cover_img') {
    return res.codeMsg('文章封面是必选参数！')
  }

  // 2、发布文章
  articleService.uploadArticle(req, res)
}
