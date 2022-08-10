const express = require('express')
const router = express.Router()

const articleCaseController = require('../controllers/articleCaseController')

// 1、获取-文章分类（查询所有）
router.get('/list', articleCaseController.getArtCateList)

// 2、增加-文章分类

// 3、获取-文章分类详情（根据id值）

// 4、更新-文章分类

// 5、删除-文章分类

module.exports = router
