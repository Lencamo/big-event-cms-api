const articleCaseService = require('../services/articleCaseService')

// 获取 - 文章分类
exports.getArtCateList = (req, res) => {
  articleCaseService.getArtCateList(req, res)
}

// 增加 - 文章分类
exports.addArtCate = (req, res) => {
  // 1、分类名、别名查重
  articleCaseService.checkArtCate(req, res)

  // 2、新增文章分类
  articleCaseService.addArtCate(req, res)
}
