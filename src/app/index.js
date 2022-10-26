const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
// 处理错误的函数
const errHandler = require('./errHandler')
const router = require('../router/index')
app.use(koaBody());// 需要在最上层
app.use(router.routes());
// const userRouter = require('../router/user.route')
// app.use(userRouter.routes());
// const goodRouter = require('../router/good.route')
// app.use(goodRouter.routes());





// 统一处理错误
app.on('error',errHandler)

module.exports = app