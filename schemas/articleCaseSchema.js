const joi = require('joi')

const cate_name = joi.string().required()
const cate_alias = joi.string().alphanum().required()

// 增加 - 文章分类
exports.addCate_schema = {
  body: {
    cate_name,
    cate_alias
  }
}
