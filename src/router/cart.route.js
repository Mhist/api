const Router = require('koa-router');
const router = new Router({ prefix: '/cart' });
const { auth } = require('../middleware/auth.middleware');
const { validator } = require('../middleware/cart.middleware');
const {
    addToCart,
    findCartList,
    updateCart,
    deleteCart,
    selectAll,
    unSelectAll
} = require('../controller/cart.controller');
// 添加到购物车接口
router.post('/', auth, validator({ goodId: 'number' }), addToCart);
// 获取购物车列表
router.get('/', auth, findCartList);
// 更新购物车
router.patch(
    '/:id',
    auth,
    validator({
        number: { type: 'number', required: false },
        selected: { type: 'bool', required: false },
    }),
    updateCart
);
// 删除购物车接口
router.delete(
    '/',
    auth,
    validator({
        ids: 'array',
    }),
    deleteCart
);
// 全选购物车接口
router.post('/selectAll', auth, selectAll);
// 全不选购物车接口
router.post('/unSelectAll', auth, unSelectAll);
module.exports = router;
