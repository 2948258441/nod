const express = require('express');
const  date  = require('./Date');//时间格式化
const { select, create, update, del } = require('./contorl');
const cors = require('cors');
const app = express();

app.use(express.json()); // 解析 JSON 请求体
app.use(cors({ origin: 'http://localhost:5173' }));
// 处理 GET 请求，包含路径参数和查询参数
app.get('/users/:id', (req, res) => {
  const userId = req.params.id; // 路径参数
  const queryParam = req.query.q; // 查询参数

  res.send(`er ID: ${userId}, Query Param: ${queryParam}`);
});

// 处理 POST 请求，包含路径参数和请求体参数
app.post('/users/:id', (req, res) => {
  const userId = req.params.id; // 路径参数
  const requestBody = req.body; // 请求体参数
   console.log(1111)
  res.send(`User ID: ${userId}, Request Body: ${JSON.stringify(requestBody)}`);
});


//删除商品
app.delete('/goods/delete', (req, res)=>{
  let obj=JSON.parse(req.query.obj)
  del('shop',{'id':obj.id}).then(e=>{ 
    select('shop',{'classify':obj.classify,page:'all'}).then(e=>{
      if(e.length==0){
        del('shopclassify',{'classify':obj.classify})
      }
    })
    res.send({code:200,msg:'删除成功'})
  })
  
})
//修改商品
app.put('/goods/update', (req, res)=>{
  req.body.date=date(new Date())
  update('shop',req.body,{'id':req.body.id}).
  then(res.send({code:200,msg:'修改成功'}))
})
//添加商品
app.put('/goods/Add', (req, res)=>{
  req.body.date=date(new Date())
  create('shop',req.body)
  select('shopclassify',{'classify':req.body.classify}).then(e=>{
    console.log(e)
    if(e.length==0)
    create('shopclassify',{'classify':req.body.classify})
  })
  
  res.send({code:200,msg:'添加成功'})
 
})
//获取商品分类
app.get('/goods/getClassify', (req, res)=>{
  select('shopclassify').then((data)=>{
    res.send({code:200,msg:'查询成功',data:data})
  })
})
//获取所有商品
app.get('/goods/getGoods', (req, res)=>{
  pageNumber=JSON.parse(req.query?.obj)?.pageNumber
  select('shop',{},'*',10,pageNumber||1).then((data)=>{
    res.send({code:200,msg:'查询成功',data:data})
  })
})
//根据商品id获取商品
app.get('/gooods/getId', (req, res)=>{
  select('shop',{'id':req.query.id}).then((data)=>{
    
    res.send({code:200,msg:'查询成功',...data})
  })
})

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

 
