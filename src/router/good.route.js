const Router = require('koa-router')
const router = new Router({prefix:'/good'})
const {upload} = require('../controller/good.controller')
// 上传图片接口
router.get("/upload",upload)


module.exports = router