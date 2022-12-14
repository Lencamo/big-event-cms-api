const express = require('express')
const router = express.Router()

const articleController = require('../controllers/articleController')

// 1、合法性校验
const expressJoi = require('../schemas/express-joi')
const {
  addArticle_schema,
  getArticleList_schema,
  get_delArticle_schema
} = require('../schemas/articleSchema')

// 2、解析multipart / form-data数据（主要是图片）
const multer = require('multer')
const path = require('path')
// —— 通过实例对象multer、fs模块指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../public/uploads/') })

// 1、发布-文章
router.post(
  '/add',
  upload.single('cover_img'),
  expressJoi(addArticle_schema),
  articleController.uploadArticle
)

// 2、获取-文章列表
router.get(
  '/list',
  expressJoi(getArticleList_schema),
  articleController.getArticleList
)

// 3、获取-文章详情
router.get(
  '/info',
  expressJoi(get_delArticle_schema),
  articleController.getArticleDetail
)

// 4、删除-文章
router.delete(
  '/info',
  expressJoi(get_delArticle_schema),
  articleController.delArticle
)

module.exports = router
