const pool = require('./db');

async function select(table, where = {}, fields = '*', pageSize = 10, pageNumber = 1) {
  // 计算分页的偏移量
  const offset = (pageNumber - 1) * pageSize;

  // 查询总记录数
  let countQuery = `SELECT COUNT(*) AS total FROM ${table}`;
  if (Object.keys(where).length > 0) {
    const conditions = Object.keys(where).map(key => `${key} = ?`).join(' AND ');
    countQuery += ` WHERE ${conditions}`;
  }
  const [totalRowsResult] = await pool.execute(countQuery, Object.values(where));
  const totalRows = totalRowsResult[0].total;

  // 计算最大页码
  const maxPages = Math.ceil(totalRows / pageSize);

  let query = `SELECT ${fields} FROM ${table}`;
  if (Object.keys(where).length > 0) {
    const conditions = Object.keys(where).map(key => `${key} = ?`).join(' AND ');
    query += ` WHERE ${conditions}`;
  }

  // 添加分页的 LIMIT 和 OFFSET 子句
  query += ` LIMIT ? OFFSET ?`;

  // 执行查询
  const [rows] = await pool.query(query, [...Object.values(where), pageSize, offset]);

  // 返回结果
  return {
    currentPage: pageNumber,
    maxPages: maxPages,
    list: rows
  };
}



async function create(table, data) {
  const columns = Object.keys(data).join(', ');
  const values = Object.values(data);
  const placeholders = values.map(() => '?').join(', ');
  const [result] = await pool.query(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`, values);
  return result.insertId;
}
async function update(table, data, where) {
  const setValues = Object.keys(data).map(key => `${key} = ?`).join(', ');
  const whereKeys = Object.keys(where);
  const conditions = whereKeys.map(key => `${key} = ?`).join(' AND ');

  const [result] = await pool.query(
    `UPDATE ${table} SET ${setValues} WHERE ${conditions}`,
    [...Object.values(data), ...Object.values(where)]
  );
  return result.affectedRows;
}
async function del(table, where) {
  const conditions = Object.keys(where).map(key => `${key} = ?`).join(' AND ');

  const [result] = await pool.query(`DELETE FROM ${table} WHERE ${conditions}`, Object.values(where));
  return result.affectedRows;
}

module.exports.del = del;
module.exports.update = update;
module.exports.create = create;
module.exports.select = select;