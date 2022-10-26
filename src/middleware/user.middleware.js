const bcrypt = require('bcryptjs');
const { getUserInfo } = require('../service/user.service');
const {
    userFormateError,
    hasUserNameExistError,
    userRegisterError,
    userDoesNotExistError,
    userLoginError,
    invalidPasswordError,
} = require('../constant/err.type');
const userValidator = async (ctx, next) => {
    const { userName, password } = ctx.request.body;
    // 合法性
    if (!userName || !password) {
        console.error('用户名或者密码为空', ctx.request.body);
        ctx.app.emit('error', userFormateError, ctx);
        return;
    }
    await next();
};

const verifyUser = async (ctx, next) => {
    const { userName } = ctx.request.body;
    // 合理性
    try {
        const exist = await getUserInfo({ userName });
        if (exist) {
            console.error('用户名已经存在', { username });
            ctx.app.emit('error', hasUserNameExistError, ctx);
            return;
        }
    } catch (error) {
        console.error('用户注册错误');
        ctx.app.emit('error', userRegisterError, ctx);
        return;
    }
    await next();
};

const craptPassword = async (ctx, next) => {
    const { password } = ctx.request.body;
    // 明文密码加密
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    try {
        ctx.request.body.password = hash;
    } catch (error) {
        console.error(error,'用户注册错误');
        ctx.app.emit('error', userRegisterError, ctx);
        return;
    }
    await next();
};

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




module.exports = {
    userValidator,
    verifyUser,
    craptPassword,
    verifyLogin,
};
