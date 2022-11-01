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
npm install nodemon -D
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

## 1.将http服务和app业务进行拆分

创建目录**src/app/index.js**

```js
const Koa = require('koa');
const app = new Koa();

const userRouter = require('../router/user.route')
app.use(userRouter.routes());
module.exports = app
```

改写main.js

```js

const {APP_PORT} = require('./config/config.default')
const app = require('../src/app/index')
app.listen(APP_PORT,()=>{
    console.log(`服务器已经启动在: http://localhost:${APP_PORT}`)
});
```

## 2.将路由与控制器进行拆分

```js
class userController {
    async register(ctx, next){
        ctx.body = '用户注册成功'
    }
    async login(ctx, next){
        ctx.body = '用户登录成功'
    }
}

module.exports = new userController
```

```js

const Router = require('koa-router')
const router = new Router({prefix:'/users'})
const {register,login} = require('../controller/user.controller')
// 注册接口
router.post("/register",register)
// 登录接口
router.post("/login",login)

module.exports = router
```

# 六.解析body

```bash
npm i koa-body
```

[koa-body - npm (npmjs.com)](https://www.npmjs.com/package/koa-body)

```js
// 官方用法截取：
const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();

app.use(koaBody());
app.use(ctx => {
  ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
});

app.listen(3000);
```

```js
class userController {
    async register(ctx, next){
        
        // 获取请求参数
        console.log(ctx.request.body)
        // 操作数据库----抽离service层
        
        // 返回对应的结果
        ctx.body = ctx.request.body
    }
    async login(ctx, next){
        ctx.body = '用户登录成功'
    }
}

module.exports = new userController
```

**新建user.service.js**

```js
class userService {
    async createUser(userName,password){
        // to do:写入数据库
        return '写入数据库成功'
    }
}
module.exports = new userService()
```

```js
const {createUser} = require("../service/user.service")
class userController {
    async register(ctx, next){
        
        // 获取请求参数
        console.log(ctx.request.body)
        const {userName,password} = ctx.request.body
        // 操作数据库
        const res = await createUser(userName,password)
        // 返回对应的结果
        ctx.body = res
    }
    async login(ctx, next){
        ctx.body = '用户登录成功'
    }
}

module.exports = new userController
```

# 七、sequelize

## 1.sequelize简介

Sequelize 是一个基于 promise 的 Node.js [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping), 目前支持 [Postgres](https://en.wikipedia.org/wiki/PostgreSQL), [MySQL](https://en.wikipedia.org/wiki/MySQL), [MariaDB](https://en.wikipedia.org/wiki/MariaDB), [SQLite](https://en.wikipedia.org/wiki/SQLite) 以及 [Microsoft SQL Server](https://en.wikipedia.org/wiki/Microsoft_SQL_Server). 它具有强大的事务支持, 关联关系, 预读和延迟加载,读取复制等功能。

[Sequelize 简介 | Sequelize 中文文档 | Sequelize 中文网](https://www.sequelize.cn/)



> **对象关系映射**（英语：**Object Relational Mapping**，简称**ORM**，或**O/RM**，或**O/R mapping**），是一种程序设计技术，用于实现[面向对象](https://baike.baidu.com/item/面向对象?fromModule=lemma_inlink)编程语言里不同[类型系统](https://baike.baidu.com/item/类型系统/4273825?fromModule=lemma_inlink)的[数据](https://baike.baidu.com/item/数据/5947370?fromModule=lemma_inlink)之间的转换。从效果上说，它其实是创建了一个可在[编程语言](https://baike.baidu.com/item/编程语言/9845131?fromModule=lemma_inlink)里使用的“虚拟对象数据库”。如今已有很多免费和付费的ORM产品，而有些程序员更倾向于创建自己的ORM工具。
>
> 

* 数据表映射（对应）一个类

* 数据表中的数据行（记录）对应一个对象

* 数据表字段对应对象的属性

* 数据表的操作对应对象的方法

  
  
##  2.安装

  ```bash
  # 使用 npm
  npm i sequelize # 这将安装最新版本的 Sequelize
  # 使用 yarn
  yarn add sequelize
  ```

  你还必须手动为所选数据库安装驱动程序：

  ```bash
  # 使用 npm
  npm i pg pg-hstore # PostgreSQL
  npm i mysql2 # MySQL
  npm i mariadb # MariaDB
  npm i sqlite3 # SQLite
  npm i tedious # Microsoft SQL Server
  npm i ibm_db # DB2
  # 使用 yarn
  yarn add pg pg-hstore # PostgreSQL
  yarn add mysql2 # MySQL
  yarn add mariadb # MariaDB
  yarn add sqlite3 # SQLite
  yarn add tedious # Microsoft SQL Server
  yarn add ibm_db # DB2
  ```


## 3.连接
  ```js
  const { Sequelize } = require('sequelize');
  
  // 方法 1: 传递一个连接 URI
  const sequelize = new Sequelize('sqlite::memory:') // Sqlite 示例
  const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Postgres 示例
  
  // 方法 2: 分别传递参数 (sqlite)
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
  });
  
  // 方法 3: 分别传递参数 (其它数据库)
  const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
  });
  ```

  

```js
const { Sequelize } = require('sequelize');
const {MYSQL_DB,MYSQL_USER,MYSQL_PASSWORD,MYSQL_HOST,MYSQL_PORT} = require('../config/config.default')
// 方法 3: 分别传递参数 (其它数据库)
const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    port:MYSQL_PORT,
    dialect: 'mysql',/* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
    timeZone:'+8:00'
  });

 sequelize.authenticate()
          .then(()=>{
            console.log("连接数据库成功")
          })
          .catch(err =>{
            console.log("连接数据库失败",err)
          })

module.exports = sequelize
```

```.env
APP_PORT=8000

MYSQL_HOST=localhost

MYSQL_PORT=3306

MYSQL_USER=root

MYSQL_PASSWORD=admin123

MYSQL_DB=husi
```

## 4.逻辑处理分层

### * model层：

```js
const { DataTypes } = require('sequelize');
const sequelize = require("../db/seq");

const User = sequelize.define('husi_user', {
  // 在这里定义模型属性
  // id会被sequelize自动创建、管理
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment:'用户名 唯一'
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment:'密码'
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment:'是否是管理员 0 不是管理员（默认）  1 是管理员',
    defaultValue: 0
  },

}, {
  // 这是其他模型参数
});

// `sequelize.define` 会返回模型
console.log(User === sequelize.models.User); // true


// User.sync({ force: true });
// console.log("用户模型表刚刚(重新)创建！");

module.exports = User
```

### * controller层返回

```js
const {createUser} = require("../service/user.service")
class userController {
    async register(ctx, next){
        
        // 获取请求参数
        console.log(ctx.request.body)
        const {userName,password} = ctx.request.body
        // 操作数据库
        const res = await createUser(userName,password)
        // 返回对应的结果
        ctx.body = {
            code: 0,
            message: "用户注册成功",
            result:{
                id: res.id,
                userName: res.userName
            }
        }
    }
    async login(ctx, next){
        ctx.body = '用户登录成功'
    }
}

module.exports = new userController
```

### * service层

```js
const User = require('../model/user.model');

class userService {
    async createUser(userName, password) {
         // to do:写入数据库
        // 创建一个新用户
        const res = await User.create({
            userName: userName,
            password: password,
        });
        console.log(res);
       
        return res.dataValues;
    }
}
module.exports = new userService();
```

# 八、错误处理

## 1.处理函数

app下新建errHandler.js

```js
module.exports = (err, ctx) => {
    let status = 500;
    switch (err.code) {
        case '10001':
            status = 400;
        case '10002':
            status = 409;
        case '10003':
                status = 500;
        break
        default:
            status = 500
    }
    ctx.status = status
    ctx.body = err;
};
```

## 2.错误类型

src下新建constant文件夹、用户存储错误类型信息

```js
module.exports = {
    userFormateError:{
        code:'10001',
        message:'用户名或者密码为空',
        result:''
    },

    hasUserNameExistError:{
        code:'10002',
        message:'用户名已经存在',
        result:''
    },

    userRegisterError:{
        code:'10003',
        message:'用户注册错误',
        result:''
    }


}
```

## 3.统一处理

app/index.js统一处理错误

```js
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
```

# 九、加密

在将密码保存到数据库之前、要对密码进行加密处理，

加盐的加密方式：**bcrypt.js**    零依赖

[bcryptjs - npm (npmjs.com)](https://www.npmjs.com/package/bcryptjs)

## 1.安装bcryptjs

```bash
npm i bcryptjs
```

## 2.编写加密中间件

```js
const verifyLogin = async (ctx, next) => {
    const { userName, password } = ctx.request.body;
    try {
        // 1.判断用户是否存在，不存在就报错
        const res = await getUserInfo({ userName });
        console.log(res, '***************');
     
        if (!res) {
            console.log('用户名不存在', { userName });
            ctx.app.emit('error', userDoesNotExistError, ctx);
            return;
        }
        // 2.用户存在，比对密码是否匹配，不匹配报错
        // 明文密码解密
        let isMatch = bcrypt.compareSync(password, res.password)
        if (!isMatch) {
            console.error('密码不匹配');
            ctx.app.emit('error', invalidPasswordError, ctx);
            return
        }
    } catch (error) {
        console.log(error)
        console.error('用户登录错误');
        ctx.app.emit('error', userLoginError, ctx);
        return;
    }

    await next();
};
```

## 3.在router 中使用：

```js
// 登录接口
router.post("/login",userValidator,verifyLogin,login)
```

# 十、用户的认证

登录成功后、给用户颁发token令牌，用户在以后的每一次请求中、携带该令牌、在服务端对令牌进行有效性校验。



## 1.JWT(json web token)的构成

第一部分我们称它为头部（header)

,第二部分我们称其为载荷（payload, 类似于飞机上承载的物品)，

第三部分是签证（signature).



## 2.安装 jsonwebtoken

```
npm i jsonwebtoken
```



## 3.使用jwt生成token

并在登录成功后作为结果返回。

```js
 // 操作数据库
        try {
            // 从返回结果中剔除password字段，剩下的属性放到新的对象resUser中
            const { password, ...res } = await getUserInfo({ userName });
            console.log(res)//{ id: 27, userName: 'sss5', isAdmin: false }
            // 返回对应的结果
            ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
                },
            };
        } catch (error) {
            console.log('用户登录失败', error);
            ctx.app.emit('error', userLoginError, ctx);
        }
```

![](https://files.catbox.moe/760hiu.png)

## 4.token值：

```js
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsInVzZXJOYW1lIjoic3NzNSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjY3MTA2OTIsImV4cCI6MTY2Njc5NzA5Mn0.pfebYFF4T-JRjxB4M3L8CZ5AAnhZK5tnvVDgkkzUzYk
```



# 十一、修改密码

## 1.新建路由









## 2.请求内容

```js
{
  method: 'PATCH',
  url: '/users/',
  header: {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsInVzZXJOYW1lIjoic3NzNSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjY3MTA2OTIsImV4cCI6MTY2Njc5NzA5Mn0.pfebYFF4T-JRjxB4M3L8CZ5AAnhZK5tnvVDgkkzUzYk', 
    'content-type': 'application/json',
    'user-agent': 'PostmanRuntime/7.29.2',
    accept: '*/*',
    'cache-control': 'no-cache',
    'postman-token': 'ffdf5be9-4e00-48f8-80c4-b7f95cba5fb1',
    host: 'localhost:8000',
    'accept-encoding': 'gzip, deflate, br',
    connection: 'keep-alive',
    'content-length': '26'
  }
}

```

## 3.auth验证token中间件

```js
const  jwt  = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/config.default')
const auth = async (ctx, next) => {
    const {authorization} = ctx.request.header;
    const token = authorization.replace('Bearer ','')
    console.log(token)
    //  验证token
    try {
        const user  = jwt.verify(token,JWT_SECRET)
        console.log(user)
        ctx.state.user = user
    } catch (error) {
          switch (error.name) {
            case 'TokenExpiredError':
                console.error('token已经过期', error);
                ctx.app.emit('error', tokenExpiredError, ctx);
                return;
            case 'JsonWebTokenError':
                console.error('无效的token', error);
                ctx.app.emit('error', invalidTokenError, ctx);
                return;
        }
    }

    await next();
};

module.exports = {
    auth,

};
```

## 4.user信息为：

```js
{
  id: 27,
  userName: 'sss5',
  isAdmin: false,
  iat: 1666710692,
  exp: 1666797092
}
```

## 5.修改密码操作

```js
async updatePassword (ctx,next) {
         // 获取请求参数
         // 1.获取请求中的新密码 携带token
         const id = ctx.state.user.id
         const {password} = ctx.request.body
         // 操作数据库
         try {
         const res =  await updateById({id,password})
         if(res){
            // 返回对应的结果
            ctx.body = {
                code: 0,
                message: '修改密码成功',
                result: ''
            };
         }
 
         } catch (error) {
             console.log('修改密码失败', error);
             ctx.app.emit('error', updatePasswordError, ctx);
         }

       
    }
   
}
```

## 6.操作数据库service 方法：

```js
    async updateById({ id, userName, password, isAdmin }) {
        
            const wehreOpt = { id };
            const newUser = {};
            userName && Object.assign(newUser, { userName });
            password && Object.assign(newUser, { password });
            isAdmin && Object.assign(newUser, { isAdmin });
            const res = await User.update(newUser, {
                where: wehreOpt,
            });
            console.log(res);
            return res[0]>0 ? true : false;
    }
```



# 十二、图片上传

**基本逻辑：先验证是否登录、登录后验证是否是管理员、是管理员可以上传、不是的话提示无管理员权限。**

**验证是否登录复用之前的auth方法**

## 1.是否是管理员

```js
const hadAdminPermission = async (ctx, next) => {
    try {
        const {isAdmin} = ctx.state.user
        console.log(isAdmin);
        if(!isAdmin){
            console.error('该用户没有管理员权限',ctx.state.user)
            ctx.app.emit('error', noAdminPermissionError, ctx);
        }
    } catch (error) {
        console.error("上传图片失败",error)
        ctx.app.emit('error', uploadPictureError, ctx);
    }

    await next();
};
```



## 2.遇到的问题：

https://github.com/koajs/koa-body/issues/171

[koa-body文件上传ctx.request.files为undefined](https://segmentfault.com/q/1010000017437815)

![](https://files.catbox.moe/w2pvmp.png)

**解决：应该用post请求**

```js
async upload(ctx, next) {
  
        try {
        // 获取请求参数
        const file = ctx.request.files.file;
        console.log(file,"***") 
       // 操作数据库
       // 返回对应的结果
         if(file){
            ctx.body = {
                code: 0,
                message: '图片上传成功',
                result: ''
            };
         }
         else{
            console.error("上传图片失败");
            ctx.app.emit('error', uploadPictureError, ctx);
            return
         }
        } catch (error) {
            console.log(error,"上传图片失败");
            ctx.app.emit('error', uploadPictureError, ctx);
            return
        }
    }
```

## 3.file的输出结果：

```
PersistentFile {
  _events: [Object: null prototype] { error: [Function (anonymous)] },
  _eventsCount: 1,
  _maxListeners: undefined,
  lastModifiedDate: 2022-10-26T16:41:03.473Z,
  filepath: 'D:\\api\\src\\upload\\98ef725fe046f9fe45fbb0100.jpg',
  newFilename: '98ef725fe046f9fe45fbb0100.jpg',
  originalFilename: '微信图片_20220710140048.jpg',
  mimetype: 'image/jpeg',
  hashAlgorithm: false,
  size: 7890553,
  _writeStream: WriteStream {
    _writableState: WritableState {
      objectMode: false,
      highWaterMark: 16384,
      finalCalled: true,
      needDrain: true,
      ending: true,
      ended: true,
      finished: true,
      destroyed: true,
      decodeStrings: true,
      defaultEncoding: 'utf8',
      length: 0,
      writing: false,
      corked: 0,
      sync: false,
      bufferProcessing: false,
      onwrite: [Function: bound onwrite],
      writecb: null,
      writelen: 0,
      afterWriteTickInfo: null,
      buffered: [],
      bufferedIndex: 0,
      allBuffers: true,
      allNoop: true,
      pendingcb: 0,
      prefinished: true,
      errorEmitted: false,
      emitClose: true,
      autoDestroy: true,
      errored: null,
      closed: false
    },
    _events: [Object: null prototype] { error: [Function (anonymous)] },
    _eventsCount: 1,
    _maxListeners: undefined,
    path: 'D:\\api\\src\\upload\\98ef725fe046f9fe45fbb0100.jpg',
    fd: null,
    flags: 'w',
    mode: 438,
    start: undefined,
    autoClose: true,
    pos: undefined,
    bytesWritten: 7890553,
    closed: false,
    [Symbol(kFs)]: {
      appendFile: [Function: appendFile],
      appendFileSync: [Function: appendFileSync],
      access: [Function: access],
      accessSync: [Function: accessSync],
      chown: [Function: chown],
      chownSync: [Function: chownSync],
      chmod: [Function: chmod],
      chmodSync: [Function: chmodSync],
      close: [Function: close],
      closeSync: [Function: closeSync],
      copyFile: [Function: copyFile],
      copyFileSync: [Function: copyFileSync],
      createReadStream: [Function: createReadStream],
      createWriteStream: [Function: createWriteStream],
      exists: [Function: exists],
      existsSync: [Function: existsSync],
      fchown: [Function: fchown],
      fchownSync: [Function: fchownSync],
      fchmod: [Function: fchmod],
      fchmodSync: [Function: fchmodSync],
      fdatasync: [Function: fdatasync],
      fdatasyncSync: [Function: fdatasyncSync],
      fstat: [Function: fstat],
      fstatSync: [Function: fstatSync],
      fsync: [Function: fsync],
      fsyncSync: [Function: fsyncSync],
      ftruncate: [Function: ftruncate],
      ftruncateSync: [Function: ftruncateSync],
      futimes: [Function: futimes],
      futimesSync: [Function: futimesSync],
      lchown: [Function: lchown],
      lchownSync: [Function: lchownSync],
      lchmod: undefined,
      lchmodSync: undefined,
      link: [Function: link],
      linkSync: [Function: linkSync],
      lstat: [Function: lstat],
      lstatSync: [Function: lstatSync],
      lutimes: [Function: lutimes],
      lutimesSync: [Function: lutimesSync],
      mkdir: [Function: mkdir],
      mkdirSync: [Function: mkdirSync],
      mkdtemp: [Function: mkdtemp],
      mkdtempSync: [Function: mkdtempSync],
      open: [Function: open],
      openSync: [Function: openSync],
      opendir: [Function: opendir],
      opendirSync: [Function: opendirSync],
      readdir: [Function: readdir],
      readdirSync: [Function: readdirSync],
      read: [Function: read],
      readSync: [Function: readSync],
      readv: [Function: readv],
      readvSync: [Function: readvSync],
      readFile: [Function: readFile],
      readFileSync: [Function: readFileSync],
      readlink: [Function: readlink],
      readlinkSync: [Function: readlinkSync],
      realpath: [Function],
      realpathSync: [Function],
      rename: [Function: rename],
      renameSync: [Function: renameSync],
      rm: [Function: rm],
      rmSync: [Function: rmSync],
      R_OK: 4,
      W_OK: 2,
      X_OK: 1,
      constants: [Object: null prototype],
      promises: [Getter]
    },
    [Symbol(kCapture)]: false,
    [Symbol(kIsPerformingIO)]: false
  },
  hash: null,
  [Symbol(kCapture)]: false
} ***
```

# 十三、指定静态资源文件夹

[koa-static - npm (npmjs.com)](https://www.npmjs.com/package/koa-static)

```js
const path = require('path')
const Koa = require('koa');
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

app.use(koaStatic(path.join(__dirname,'../upload')))
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
```

访问：

```
{
    "code": 0,
    "message": "图片上传成功",
    "result": {
        "good_img": "f497c30c6639edbeb1fd2ef03.jpg"
    }
}
```



http://localhost:8000/指定资源文件夹下的文件名：

(http://localhost:8000/f497c30c6639edbeb1fd2ef00.jpg)`



# 十四、发布商品

## 1.参数校验

**koa-parameter**

1. 初步：**koa-parameter**

```js
const {goodFormateError} = require('../constant/err.type')
const paramValidator = async (ctx, next) => {
    try {
    ctx.verifyParams({
        goodName: {
            type:'string',
            required: true
        },
        goodPrice: {
            type:'number',
            required: true
        },
        goodNum: {
            type:'number',
            required: true
        },
        goodImg: {
            type:'string',
            required: true
        },


      });
     
    } catch (error) {
      console.error(error)
      goodFormateError.result = error
      ctx.app.emit('error', goodFormateError, ctx);
      return
    }

    await next();
};



module.exports = {
    paramValidator,
};

```

# 一、什么是nginx?

Nginx是俄罗斯人Igor Sysoev编写的轻量级Web服务器，它的发音为 [ˈendʒɪnks] ，它不仅是一个高性能的HTTP和反向代理服务器，同时也是一个IMAP/POP3/SMTP 代理服务器。

截至2019年12月，差不多世界上每3个网站中就有1个使用Nginx。

Nginx以事件驱动的方式编写，所以有非常好的性能，同时也是一个非常高效的反向代理、负载平衡服务器。在性能上，Nginx占用很少的系统资源，能支持更多的并发连接，达到更高的访问效率；在功能上，Nginx是优秀的代理服务器和负载均衡服务器；在安装配置上，Nginx安装简单、配置灵活。

Nginx支持热部署，启动速度特别快，还可以在不间断服务的情况下对软件版本或配置进行升级，即使运行数月也无需重新启动。

在微服务的体系之下，Nginx正在被越来越多的项目采用作为网关来使用，配合Lua做限流、熔断等控制。



# 二、部署项目的基本流程



![](https://files.catbox.moe/iqynp7.jpg)



项目的源码地址为：[https://github.com/Mhist/api](https://github.com/Mhist/api)

# 将文件上传至宝塔面板：

![](https://files.catbox.moe/wztgm5.png)

通过**npm i**安装依赖

并且通过pm2 启动项目

```bash
pm2 start src/main.js 
```

![](https://files.catbox.moe/d6bzu4.jpg)

## 配置代理的大概原理：

![](https://files.catbox.moe/6osaoz.png)

```js
server
    {
        listen 80;
        server_name localhost;
        index index.html index.htm index.php;
        root  /www/server/phpmyadmin;

        #error_page   404   /404.html;
        include enable-php.conf;
        
        location / {
          proxy_pass http://localhost:8666;
        }
        
        location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
        {
            expires      30d;
        }

        location ~ .*\.(js|css)?$
        {
            expires      12h;
        }

        location ~ /\.
        {
            deny all;
        }

        access_log  /www/wwwlogs/access.log;
    }
```

## 修改部分：

>  listen 80;
>         server_name localhost;
>
>  location / {
>           proxy_pass http://localhost:8666;
>         }



修改env中的端口号：本地8000 线上是8666

修改数据库用户名 本地是root 线上是admin

保持mysql版本一致，本地是8.0；线上也需要是8.0，model文件中的强制建表语句取消注释运行一遍建表语句、然后重新注释掉。

# 接口文档地址
koa2_husi项目
https://www.apifox.cn/apidoc/shared-5bd98502-7911-48ee-9428-1fecdf8dd35d/api-47064905

