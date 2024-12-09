const  date  = require('./Date');//时间格式化
const { select, create, update, del } = require('./contorl');
const orderApi=app=>{

    app.get('/order/getById',(req,res)=>{
        let obj=JSON.parse(req.query.obj)

        select('orders',{id:obj.id}).then(e=>{
            res.send({code:200,msg:'查询成功',data:e.list})
        })
    })
    app.get('/order/getAll',(req,res)=>{
    let obj=JSON.parse(req.query?.obj)

        select('orders',{},'*',10,obj?.pageNumber||1).then(e=>{
            res.send({code:200,msg:'查询成功',data:e.list})
        })
    })
    app.post('/order/create',(req,res)=>{
        
        req.body.date=date(new Date())
        req.body.orderid=parseInt('4'+((Math.random()+'').slice(2,12)))
        
        create('orders',obj).then(e=>{
            res.send({code:200,msg:'添加成功',data:e})
        })
    })
    app.delete('/order/delete',(req,res)=>{
    let obj=JSON.parse(req.query?.obj)

        del('orders',{id:obj.id}).then(e=>{
            res.send({code:200,msg:'删除成功',data:e})
        })
    })
    app.put('/order/update',(req,res)=>{
    let obj=JSON.parse(req.query?.obj)

        update('orders',obj,{id:obj.id}).then(e=>{
            res.send({code:200,msg:'修改成功',data:e})
        })
    })
}
module.exports=orderApi