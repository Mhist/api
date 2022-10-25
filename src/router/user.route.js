const Router = require('koa-router')
const router = new Router({prefix:'/users'})
const {register,login} = require('../controller/user.controller')
// 导入中间件
const {userValidator,verifyUser,craptPassword} = require('../middleware/user.middleware')
// 注册接口
router.post("/register",userValidator,verifyUser,craptPassword,register)
// 登录接口
router.post("/login",login)

module.exports = router