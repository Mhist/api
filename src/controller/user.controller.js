const jwt = require('jsonwebtoken');
const { createUser, getUserInfo,updateById } = require('../service/user.service');
const { userRegisterError,updatePasswordError } = require('../constant/err.type');
const { JWT_SECRET } = require('../config/config.default');
class userController {
    async register(ctx, next) {
        // 获取请求参数
        console.log(ctx.request.body);
        const { userName, password } = ctx.request.body;

        // 操作数据库
        try {
            const res = await createUser(userName, password);
            // 返回对应的结果
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    userName: res.userName,
                },
            };
        } catch (error) {
            console.log(error);
            ctx.app.emit('error', userRegisterError, ctx);
        }
    }
    async login(ctx, next) {
        // 获取请求参数
        console.log(ctx.request.body);
        const { userName } = ctx.request.body;
        ctx.body = `欢迎回来，${userName}`;

        // 1.获取用户信息   token的payload中需要包含：id、userName、isAdmin

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
    }

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


    async getUserDetail(ctx){
         try {
       // token解析用户信息
       const authorization =  ctx.request.headers.authorization
       const token = authorization.replace("Bearer ",'')
       // get the decoded payload ignoring signature, no secretOrPrivateKey needed
        let decoded = jwt.decode(token);
        const {userName} = decoded
       const { password, ...res } = await getUserInfo({ userName });
       console.log(res)//{ id: 27, userName: 'sss5', isAdmin: false }
        // 操作数据库
        // 返回对应的结果
        ctx.body = {
            code: 0,
            message: '获取用户信息成功',
            result: res
        };
        //  if(res){
            
         
        //  }
 
         } catch (error) {
             console.log('获取用户信息失败', error);
             ctx.app.emit('error', getUserInfoError, ctx);
         }
    }
   
}

module.exports = new userController();
