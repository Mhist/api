const { Model } = require('sequelize');
const {invalidGoodIdError} = require('../constant/err.type')
const validator = async(ctx,next)=>{
    try {
        ctx.verifyParams({
            goodId: {
                type:'number',
                required: true
            }
          });
         
        } catch (error) {
          console.error(error)
          invalidGoodIdError.result = error
          ctx.app.emit('error', invalidGoodIdError, ctx);
          return
        }
    
        await next();
}
module.exports = {
    validator
}