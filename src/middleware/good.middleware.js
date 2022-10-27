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
