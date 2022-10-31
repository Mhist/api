const Router = require('koa-router');
const router = new Router({ prefix: '/order' });
const { auth } = require('../middleware/auth.middleware');
const { validatorOrder } = require('../middleware/order.middleware');
const {
    addOrder,
    getOrderList,
    editOrder,
} = require('../controller/order.controller');
// 生成订单接口
router.post('/',auth,validatorOrder({
    addressId:'int',
    goodInfo:'string',
    total:'string'
}) ,addOrder);

// 获取订单列表
router.get('/',auth,getOrderList)

// 修改订单接口
router.patch('/:id',auth,validatorOrder( {
    status:{type: 'int',required:true}
}), editOrder)


module.exports = router;
