const joi = require('joi')

const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()

const pagenum = joi.number().integer().required()
const pagesize = joi.number().integer().required()

// 发布 - 文章
exports.addArticle_schema = {
  body: {
    title,
    cate_id,
    content,
    state
  }
}

exports.getArticleList_schema = {
  query: {
    pagenum,
    pagesize
  }
}
