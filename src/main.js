const Koa = require('koa');
const app = new Koa();

const {APP_PORT} = require('./config/config.default')

app.use(async ctx => {
  ctx.body = 'Hello World2';
});

app.listen(APP_PORT,()=>{
    console.log(`服务器已经启动在: http://localhost:${APP_PORT}`)
});