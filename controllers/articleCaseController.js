const articleCaseService = require('../services/articleCaseService')

// 获取 - 文章分类
exports.getArtCateList = (req, res) => {
  articleCaseService.getArtCateList(req, res)
}
