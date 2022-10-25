const bcrypt = require('bcryptjs')
const { getUserInfo } = require('../service/user.service');
const {userFormateError,hasUserNameExistError,userRegisterError} = require('../constant/err.type')
const userValidator = async (ctx, next) => {
    const { userName, password } = ctx.request.body;
    // 合法性
    if (!userName || !password) {
        console.error('用户名或者密码为空', ctx.request.body);
        ctx.app.emit('error',userFormateError,ctx)
        return;
    }
    await next();
};

const verifyUser = async (ctx, next) => {
    const { userName } = ctx.request.body;
    // 合理性
    try {
        const exist = await getUserInfo({ userName })
        if (exist) {
            console.error('用户名已经存在',{username})
            ctx.app.emit('error',hasUserNameExistError,ctx)
            return;
        }
    } catch (error) {
        console.error('用户注册错误')
        ctx.app.emit('error',userRegisterError,ctx)
        return
    }
    await next();
};

const craptPassword = async (ctx, next) => {
    const { password } = ctx.request.body;
    // 明文密码加密
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password,salt)
    try {
        ctx.request.body.password = hash
    } catch (error) {
        console.error('用户注册错误')
        ctx.app.emit('error',userRegisterError,ctx)
        return
    }
    await next();
};

module.exports = {
    userValidator,
    verifyUser,
    craptPassword
};
