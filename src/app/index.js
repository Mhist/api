const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
app.use(koaBody());// 需要在最上层
const userRouter = require('../router/user.route')
app.use(userRouter.routes());
// 处理错误的函数
const errHandler = require('./errHandler')




// 统一处理错误
app.on('error',errHandler)

module.exports = app