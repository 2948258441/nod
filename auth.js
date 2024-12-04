// auth.js
const jwt = require('jsonwebtoken');

// 秘钥应该保存在环境变量或安全的地方
const SECRET_KEY = require('dotenv').config().parsed?.SECRET_KEY; // 不要硬编码在代码中！

function generateToken(user) {
  const payload = {
    id: user.id, // 用户唯一标识符
    // 你可以根据需要添加更多字段
  }

  // 设置 token 过期时间，例如：'2h' 表示两小时后过期
  const options = {
    expiresIn: '4h',
  };

  return jwt.sign(payload, SECRET_KEY, options);
}
function findtoken(token,next) {

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user; // 将解码后的用户信息附加到请求对象上
        next(); // 继续处理请求
        
      });
}


module.exports = { generateToken,findtoken};