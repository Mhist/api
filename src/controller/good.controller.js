class goodController {
    async upload(ctx, next) {
        // 获取请求参数
        console.log(ctx.request.body);
     

        // 操作数据库
        try {
          
            // 返回对应的结果
            ctx.body = {
                code: 0,
                message: '图片上传成功',
                result: ''
            };
        } catch (error) {
            console.log(error);
            ctx.app.emit('error', userRegisterError, ctx);
        }
    }
  

   
}

module.exports = new goodController();