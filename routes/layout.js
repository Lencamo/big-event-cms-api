const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.send({
    code: 0,
    message: '获取左侧菜单成功！',
    data: [
      {
        indexPath: '/home',
        title: '首页',
        icon: 'el-icon-s-home',
        children: null
      },
      {
        indexPath: '2',
        title: '文章管理',
        icon: 'el-icon-s-order',
        children: [
          {
            indexPath: '/art-cate',
            title: '文章分类',
            icon: 'el-icon-s-data'
          },
          {
            indexPath: '/art-list',
            title: '文章列表',
            icon: 'el-icon-document-copy'
          }
        ]
      },
      {
        indexPath: '3',
        title: '个人中心',
        icon: 'el-icon-user-solid',
        children: [
          {
            indexPath: '/user-info',
            title: '基本资料',
            icon: 'el-icon-s-operation'
          },
          {
            indexPath: '/user-avatar',
            title: '更换头像',
            icon: 'el-icon-camera'
          },
          {
            indexPath: '/user-pwd',
            title: '重置密码',
            icon: 'el-icon-key'
          }
        ]
      }
    ]
  })
})

module.exports = router
