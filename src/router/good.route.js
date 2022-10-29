const Router = require('koa-router');
const router = new Router({ prefix: '/good' });
const { auth, hadAdminPermission } = require('../middleware/auth.middleware');
const { paramValidator } = require('../middleware/good.middleware');
const { upload,postGood,updateGood,deleteGood,restoreGood,findAll } = require('../controller/good.controller');
// 上传图片接口
router.post('/upload', auth, hadAdminPermission, upload);
// 发布商品接口
router.post('/', auth, hadAdminPermission,paramValidator,postGood);
// 修改商品接口
router.put('/:id', auth, hadAdminPermission,paramValidator,updateGood);
// 软删除接口
router.post('/:id', auth, hadAdminPermission,deleteGood);
// 上架商品接口
router.post('/:id/on', auth, hadAdminPermission,restoreGood);
// 商品列表接口
router.get('/', findAll);


module.exports = router;
