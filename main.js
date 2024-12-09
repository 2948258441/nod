const express = require('express');
const cors = require('cors');
const goodsApi=require('./goodsApi');
const orderApi=require('./ordersApi');
const app = express();
app.use(express.json()); // 解析 JSON 请求体
app.use(cors({ origin: 'http://localhost:5173' }));
goodsApi(app)
orderApi(app)
// goodsApi(app)

// 处理 GET 请求，包含路径参数和查询参数



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



// let http=require('http')
// const { generateToken,findtoken} = require('./auth')
// http.createServer((req,res)=>{
//    res.writeHead(200, { 'Content-Type': 'application/json' });
//    if(req.url=='/login'){
      
//       req.on('data',e=>{

//          res.end(`${generateToken(e.toString())}`)

//       })
//       // res.end('我输出的内容')
//    }else  if(req.url=='/a'){

//       req.on('data',e=>{
//          findtoken(req.headers.token)
//          res.end('我输出的内容')

//       })
//       // res.end('我输出的内容')
//    }
//    console.log(111)
   
// }).listen(8081,e=>{
//    console.log('http://localhost:8081/login')
// })

 
