const pool = require('./db');
async function select(table, where = {}, fields = '*') {
    let query = `SELECT ${fields} FROM ${table}`;
    const keys = Object.keys(where);
    if (keys.length > 0) {
      const conditions = keys.map(key => `${key} = ?`).join(' AND ');
      query += ` WHERE ${conditions}`;
    }
  
    const [rows] = await pool.query(query, Object.values(where));
    return rows;
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