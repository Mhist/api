const Path = require('path')
const { uploadPictureError,unSupportFileTypeError,postGoodError,updateGoodError,invalidGoodIdError,deleteGoodError,getGoodListError } = require('../constant/err.type');
const { createGood,updateGoodById,removeGood,restoreGoodById,findAllGoodList } = require('../service/good.service')
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

    async updateGood(ctx,next){
        try {
            const res = await updateGoodById(ctx.params.id,ctx.request.body)
           if(res){
            ctx.body = {
                code: 0,
                message: '修改商品成功',
                result: ''
            };
           }
           else{
            ctx.app.emit('error', invalidGoodIdError, ctx);
            return
           }
            } catch (error) {
                console.error(error,"修改商品失败");
                ctx.app.emit('error', updateGoodError, ctx);
                return
            }
        }

    async deleteGood(ctx,next){
        try {
        const res = await removeGood(ctx.params.id)
         if(res){
            ctx.body = {
                code: 0,
                message: '删除商品成功',
                result: ''
            };
         }else{
            console.error("商品id不存在");
            ctx.app.emit('error', invalidGoodIdError, ctx);
            return
         }
        } catch (error) {
            console.error(error,"删除商品失败");
            ctx.app.emit('error', deleteGoodError, ctx);
            return
        }
    }

    
    async restoreGood(ctx,next){
        try {
        const res = await restoreGoodById(ctx.params.id)
        console.log(res)
         if(res){
            ctx.body = {
                code: 0,
                message: '上架商品成功',
                result: ''
            };
         }else{
            console.error("商品id不存在");
            ctx.app.emit('error', invalidGoodIdError, ctx);
            return
         }
        } catch (error) {
            console.error(error,"上架商品失败");
            ctx.app.emit('error', deleteGoodError, ctx);
            return
        }
    }

    async findAll(ctx){
        try {
            const {pageNum = 1 , pageSize = 10} = ctx.request.query
            console.log(pageNum,pageSize)
            const res = await findAllGoodList(pageNum,pageSize)
                ctx.body = {
                    code: 0,
                    message: '获取商品列表成功',
                    result: res||[]
                };
            } catch (error) {
                console.error(error,"获取商品列表失败");
                ctx.app.emit('error', getGoodListError, ctx);
                return
            }
    }

}


module.exports = new goodController();