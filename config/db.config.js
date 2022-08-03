const mysql2 = require('mysql2')

// 创建🚩连接池对象
const promisePool = mysql2
  .createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'bigEvent_api',
    connectionLimit: 1 //创建的连接池个数
  })
  .promise()

// 向外共享 promisePool 数据库连接对象
module.exports = promisePool
