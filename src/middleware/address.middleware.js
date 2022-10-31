const {addressFormatError} = require('../constant/err.type')
const validatorAddress = (rules)=>{
    return async(ctx,next)=>{
        try {
            ctx.verifyParams(rules);
            } catch (error) {
              console.error(error)
              addressFormatError.result = error
              ctx.app.emit('error', addressFormatError, ctx);
              return
            }
        
            await next();
    }
}
module.exports = {
    validatorAddress
}