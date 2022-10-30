const Router = require('koa-router');
const router = new Router({ prefix: '/cart' });
const { auth, hadAdminPermission } = require('../middleware/auth.middleware');
const {validator} = require('../middleware/cart.middleware')
const { addToCart } = require('../controller/cart.controller');
// 添加到购物车接口
router.post('/', auth, validator, addToCart);

module.exports = router;
