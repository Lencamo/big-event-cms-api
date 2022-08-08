var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')
const joi = require('joi')

var indexRouter = require('./routes/index')

const userRouter = require('./routes/user')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

// res.send()数据响应👏封装（代码优化）（路由之前）
app.use(function (req, res, next) {
  // code = 0 为成功； code = 1 为失败； 默认将 code 的值设置为 1，方便处理失败的情况
  res.codeMsg = function (err, code = 1) {
    res.send({
      // 状态
      code,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

app.use('/', indexRouter)

// 登录注册路由模块
app.use('/api', userRouter)

// express-joi对应的错误级别中间件
app.use(function (err, req, res, next) {
  // 若Joi 参数校验失败
  if (err instanceof joi.ValidationError) {
    return res.codeMsg(err)
  }
  // 其他未知错误
  return res.codeMsg(err)
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
