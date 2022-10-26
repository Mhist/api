const Router = require('koa-router')
const router = new Router({prefix:'/users'})
const {register,login,updatePassword} = require('../controller/user.controller')
// 导入中间件
const {userValidator,verifyUser,verifyLogin,craptPassword} = require('../middleware/user.middleware')
const {auth} = require('../middleware/auth.middleware')
// 注册接口
router.post("/register",userValidator,verifyUser,craptPassword,register)
// 登录接口
router.post("/login",userValidator,verifyLogin,login)
// 修改密码接口
router.patch("/",auth,craptPassword,updatePassword)

module.exports = router