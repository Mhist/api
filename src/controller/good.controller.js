const Path = require('path')
const { uploadPictureError,unSupportFileTypeError,postGoodError } = require('../constant/err.type');
const { createGood } = require('../service/good.service')
class goodController {
    async upload(ctx, next) {
        try {
        // 获取请求参数
        const {file} = ctx.request.files;
    
       // 操作数据库
       // 返回对应的结果
         if(file){
            const mimetypes = ['image/jpeg', 'image/png'];
            let isMatchFileType = mimetypes.includes(file.mimetype); 
            if(isMatchFileType){
                ctx.body = {
                    code: 0,
                    message: '图片上传成功',
                    result: {
                        good_img: Path.basename(file.filepath)
                    }
                };
             }else{
                console.error("上传的文件类型不支持、只支持jpeg、jpg、png");
                ctx.app.emit('error', unSupportFileTypeError, ctx);
                return
             }
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
    
    async postGood(ctx, next){
        try {
            const {updatedAt,createdAt,...res} = await createGood(ctx.request.body)
            ctx.body = {
                code: 0,
                message: '发布商品成功',
                result: res
            };
            } catch (error) {
                console.log(error,"发布商品失败");
                ctx.app.emit('error', postGoodError, ctx);
                return
            }
        }
    }

module.exports = new goodController();