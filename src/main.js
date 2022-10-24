
const {APP_PORT} = require('./config/config.default')
const app = require('../src/app/index')
app.listen(APP_PORT,()=>{
    console.log(`服务器已经启动在: http://localhost:${APP_PORT}`)
});