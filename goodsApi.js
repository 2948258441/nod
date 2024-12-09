const  date  = require('./Date');//时间格式化
const { select, create, update, del } = require('./contorl');
const goodsApi=(app)=>{
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
      app.post('/goods/Add', (req, res)=>{
        req.body.date=date(new Date())
        create('shop',req.body).then(e=>{
      
          select('shopclassify',{'classify':req.body.classify}).then(e=>{
            if(e.length==0)
            create('shopclassify',{'classify':req.body.classify})
          })
          res.send({code:200,msg:'添加成功'})
        })
        
        
        
       
      })
      //获取商品分类
      app.get('/goods/getClassify', (req, res)=>{
        select('shopclassify').then((data)=>{
          res.send({code:200,msg:'查询成功',data:data.list})
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
      
}
module.exports=goodsApi
// module.exports = date;