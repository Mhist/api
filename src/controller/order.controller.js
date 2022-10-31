const { createOrder,findOrderList,updateOrderById} = require('../service/order.service');
const { addOrderError,getOrderListError,editOrderError } = require('../constant/err.type');
class orderController {
    async addOrder(ctx, next) {
      
     
        try {
             // 获取请求参数
        const  userId = ctx.state.user.id
        const { addressId,goodInfo,total} = ctx.request.body
        const orderNumber = 'husi'+ Date.now()  
           // 操作数据库
           const res = await createOrder({
            userId,
            addressId,
            goodInfo,
            total,
            orderNumber
           })    
            // 返回对应的结果
            ctx.body = {
                code: 0,
                message: '添加订单成功',
                result: res,
            };
        } catch (error) {
            console.log(error);
            ctx.app.emit('error', addOrderError, ctx);
        }
    }

    async getOrderList(ctx){
         // 获取请求参数
         const userId = ctx.state.user.id;
         const { pageNum=1,pageSize=10,status=0} = ctx.request.query
         // 操作数据库
         try {
             const res = await findOrderList(pageNum,pageSize,status);
             console.log(res)
             // 返回对应的结果
             ctx.body = {
                 code: 0,
                 message: '获取地址列表成功',
                 result: res,
             };
         } catch (error) {
             console.log(error);
             ctx.app.emit('error', getOrderListError, ctx);
         }
    }

    async editOrder(ctx){
        try {
            const id = ctx.request.params.id;
            const {status}= ctx.request.body;
            console.log(id,status)
            const res = await updateOrderById(id,{status})
            console.log(res)
            if(res){
                ctx.body = {
                    code: 0,
                    message: '修改订单成功',
                    result: '',
                };
            }
        } catch (error) {
            console.log(error);
            ctx.app.emit('error', editOrderError, ctx);
        }
    }


  
   
   
}

module.exports = new orderController();
