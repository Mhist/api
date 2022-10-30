const Path = require('path')
const { addToCartError } = require('../constant/err.type');
const { createOrUpdateCart  } = require('../service/cart.service')
class cartController {
    async addToCart(ctx){
  
        try {
        // 将商品添加到购物车
        // 1.解析user_id、goods_id
        const userId = ctx.state.user.id
        const goodId = ctx.request.body.goodId
        console.log(userId,goodId)
        // 2.操作数据库
        const res = await createOrUpdateCart(userId,goodId)
        console.log(res)
        // 3.返回结果
            ctx.body = {
                code: 0,
                message: '添加到购物车成功',
                result: res
            };

            } catch (error) {
                console.error(error,"添加到购物车失败");
                ctx.app.emit('error', addToCartError, ctx);
                return
            }
        }

   

    
   

   
}


module.exports = new cartController();