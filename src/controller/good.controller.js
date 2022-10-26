const Path = require('path')
const { uploadPictureError } = require('../constant/err.type');
class goodController {
    async upload(ctx, next) {
  
        try {
        // 获取请求参数
        const {file} = ctx.request.files;
       // 操作数据库
       // 返回对应的结果
         if(file){
            ctx.body = {
                code: 0,
                message: '图片上传成功',
                result: {
                    good_img: Path.basename(file.filepath)
                }
            };
         }
         else{
            console.error("上传图片失败");
            ctx.app.emit('error', uploadPictureError, ctx);
            return
         }
        } catch (error) {
            console.log(error,"上传图片失败");
            ctx.app.emit('error', uploadPictureError, ctx);
            return
        }
    }
  

   
}

module.exports = new goodController();