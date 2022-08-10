const express = require('express')
const router = express.Router()

const articleCaseController = require('../controllers/articleCaseController')

const expressJoi = require('../schemas/express-joi')
const {
  addCate_schema,
  deleteCate_schema,
  getCate_schema
} = require('../schemas/articleCaseSchema')

// 1、获取-文章分类（查询所有）
router.get('/list', articleCaseController.getArtCateList)

// 2、增加-文章分类
router.post(
  '/add',
  expressJoi(addCate_schema),
  articleCaseController.addArtCate
)

// 3、获取-文章分类详情（根据id值）
router.get(
  '/info',
  expressJoi(getCate_schema),
  articleCaseController.getArticleDetail
)

// 4、更新-文章分类

// 5、删除-文章分类
router.delete(
  '/del',
  expressJoi(deleteCate_schema),
  articleCaseController.delArtCateList
)

module.exports = router
