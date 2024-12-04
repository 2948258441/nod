const crypto = require('crypto');

// 定义加密算法
const algorithm = 'aes-256-cbc';

// 定义密钥和初始化向量（IV）
// 密钥和IV应该是随机的，并且应该保密
const key = crypto.randomBytes(32); // 256位密钥
const iv = crypto.randomBytes(16); // 128位IV

// 要加密的数据
const data = 'Hello, World!';

// 创建加密器
const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

// 加密数据
let encrypted = cipher.update(data, 'utf8', 'hex');
encrypted += cipher.final('hex');

console.log('加密后的数据:', encrypted);

// 创建解密器
const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);

// 解密数据
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');

console.log('解密后的数据:', decrypted);
