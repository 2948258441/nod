// db.js

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'rm-wz9rd1ahcdk4qb3079o.mysql.rds.aliyuncs.com',
  user: 'qq2948258441',
  password: 'Aliyun123',
  database: 'qwe231321'
});

module.exports = pool;