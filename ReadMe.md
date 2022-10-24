# 一、项目的初始化

## 1.初始化

`npm init -y`

生成package.json文件：

* 用于记录项目的依赖



## 2.git初始化

git init 

生成.git隐藏文件夹，git的本地仓库

## 3.创建readme文件

# 二、搭建项目

## 1. 安装koa框架

```bash
npm install koa
```

koa版本号： **v2.13.4**



## 2.基本的项目示例

```js

const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000,()=>{
    console.log('服务器已经启动在: http://localhost:3000')
});
```



# 三、项目的基本优化

## 1.自动重启

```bash
npm install nodemon
```

编写package.json

```json
 "scripts": {

  "dev":"nodemon ./src/main.js",

  "test": "echo \"Error: no test specified\" && exit 1"

 },
```

启动服务：

```bash
npm run dev
```

## 2. 配置文件

```bash
npm install dotenv
```

新建文件**config.default.js**

```js

const dotenv = require('dotenv')
dotenv.config()
console.log(process.env.APP_PORT)
module.exports = process.env
```

**.env文件**

```js
APP_PORT=8000
```

通过node运行命令

```json
node src/config/config.default.js
```

控制台输出： 8000



```JS
const Koa = require('koa');
const app = new Koa();

const {APP_PORT} = require('./config/config.default')

app.use(async ctx => {
  ctx.body = 'Hello World2';
});

app.listen(APP_PORT,()=>{
    console.log(`服务器已经启动在: http://localhost:${APP_PORT}`)
});
```



# 四、路由

## 1.安装koa-router

路由：根据不同的url,调用对应的处理函数

```bash
npm install koa-router
```

步骤：

1. 导入包

2. 实例化对象

3. 编写路由

4. 注册中间件

   

## 2.编写路由

创建src/router目录，新建user.route.js

```js
const Router = require('koa-router')
const router = new Router({prefix:'/users'})

router.get("/",(ctx,next) =>{
    ctx.body = "hello users"
})

module.exports = router
```

改写**main.js**

```js
const Koa = require('koa');
const app = new Koa();
const userRouter = require('./router/user.route')
const {APP_PORT} = require('./config/config.default')
app.use(userRouter.routes());
app.listen(APP_PORT,()=>{
    console.log(`服务器已经启动在: http://localhost:${APP_PORT}`)
});
```



# 五、目录结构优化

将http服务和app业务进行拆分

创建目录**src/app/index.js**

```
const Koa = require('koa');
const app = new Koa();

const userRouter = require('../router/user.route')
app.use(userRouter.routes());
module.exports = app
```

改写main.js

```

const {APP_PORT} = require('./config/config.default')
const app = require('../src/app/index')
app.listen(APP_PORT,()=>{
    console.log(`服务器已经启动在: http://localhost:${APP_PORT}`)
});
```



