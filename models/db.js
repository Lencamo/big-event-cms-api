const mysql2 = require('mysql2')

const dbConfig = require('../config/db.config')

// 创建🚩连接池对象
const promisePool = mysql2
  .createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
  })
  .promise()

const Pool = mysql2
  .createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
  })

// 向外共享 promisePool 数据库连接对象
module.exports = { promisePool, Pool }
