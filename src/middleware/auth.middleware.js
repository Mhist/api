const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');
const { tokenExpiredError,invalidTokenError,noAdminPermissionError,uploadPictureError } = require('../constant/err.type');
const auth = async (ctx, next) => {
    const { authorization } = ctx.request.header;
    const token = authorization.replace('Bearer ', '');
    //  验证token
    try {
        const user = jwt.verify(token, JWT_SECRET);
        ctx.state.user = user;
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


const hadAdminPermission = async (ctx, next) => {
    try {
        const {isAdmin} = ctx.state.user
        if(!isAdmin){
            console.error('该用户没有管理员权限',ctx.state.user)
            ctx.app.emit('error', noAdminPermissionError, ctx);
            return
        }
    } catch (error) {
        console.error("上传图片失败",error)
        ctx.app.emit('error', uploadPictureError, ctx);
        return
    }

    await next();
};

module.exports = {
    auth,
    hadAdminPermission
};
