const {createUser,getUserInfo} = require("../service/user.service")
const {userRegisterError} = require('../constant/err.type')
class userController {
    async register(ctx, next){
        
        // 获取请求参数
        console.log(ctx.request.body)
        const {userName,password} = ctx.request.body

        // 操作数据库
        try {
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
        } catch (error) {
            console.log(error)
            ctx.app.emit('error',userRegisterError,ctx)
        }
       

    }
    async login(ctx, next){
        ctx.body = '用户登录成功'
    }
}

module.exports = new userController