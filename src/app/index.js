const path = require('path')
const Koa = require('koa');
const parameter = require('koa-parameter');
const app = new Koa();
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
app.use(koaBody(
    {
        multipart:true,
        // 配置选项不推荐使用相对路径
        // 在option里的相对路径，不是相对的当前文件，相对process.cwd()
        formidable:{
            uploadDir:path.join(__dirname,'../upload'),
            keepExtensions:true,
        }
    }
));// 需要在最上层
parameter(app); // add verifyParams method, but don't add middleware to catch the error
// app.use(parameter(app)); // also add a middleware to catch the error.

app.use(koaStatic(path.join(__dirname,'../upload')))//D:\api\src\upload *****************
// 处理错误的函数
const errHandler = require('./errHandler')
const router = require('../router/index')

app.use(router.routes())
app.use(router.allowedMethods())
// const userRouter = require('../router/user.route')
// app.use(userRouter.routes());
// const goodRouter = require('../router/good.route')
// app.use(goodRouter.routes());





// 统一处理错误
app.on('error',errHandler)

module.exports = app