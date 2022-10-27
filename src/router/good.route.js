const Router = require('koa-router');
const router = new Router({ prefix: '/good' });
const { auth, hadAdminPermission } = require('../middleware/auth.middleware');
const { paramValidator } = require('../middleware/good.middleware');
const { upload,postGood } = require('../controller/good.controller');
// 上传图片接口
router.post('/upload', auth, hadAdminPermission, upload);
// 发布商品接口
router.post('/', auth, hadAdminPermission,paramValidator,postGood);

module.exports = router;
