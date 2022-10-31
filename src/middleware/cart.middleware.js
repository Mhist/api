const { Model } = require('sequelize');
const {cartFormatError} = require('../constant/err.type')
const validator = (rules)=>{
    return async(ctx,next)=>{
        try {
            ctx.verifyParams(rules);
            } catch (error) {
              console.error(error)
              cartFormatError.result = error
              ctx.app.emit('error', cartFormatError, ctx);
              return
            }
        
            await next();
    }
}
module.exports = {
    validator
}