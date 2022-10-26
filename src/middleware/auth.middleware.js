const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');
const { tokenExpiredError,invalidTokenError } = require('../constant/err.type');
const auth = async (ctx, next) => {
    const { authorization } = ctx.request.header;
    const token = authorization.replace('Bearer ', '');
    console.log(token);
    //  验证token
    try {
        const user = jwt.verify(token, JWT_SECRET);
        console.log(user);
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

module.exports = {
    auth,
};
