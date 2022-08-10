const joi = require('joi')

const cate_name = joi.string().required()
const cate_alias = joi.string().alphanum().required()

const id = joi.number().integer().min(1).required()

// 增加 - 文章分类
exports.addCate_schema = {
  body: {
    cate_name,
    cate_alias
  }
}

// 删除 - 文章分类
exports.deleteCate_schema = {
  query: {
    id
  }
}

// 获取 - 文章分类详情
exports.getCate_schema = {
  query: {
    id
  }
}

// 更新 - 文章分类
exports.updateCate_schema = {
  body: {
    id,
    cate_name,
    cate_alias
  }
}
