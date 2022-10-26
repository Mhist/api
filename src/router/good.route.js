const Router = require('koa-router');
const router = new Router({ prefix: '/good' });
const { auth, hadAdminPermission } = require('../middleware/auth.middleware');
const { upload } = require('../controller/good.controller');
// 上传图片接口
router.post('/upload', auth, hadAdminPermission, upload);

module.exports = router;
