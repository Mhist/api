
const { createAddress,findAddressList,updateAddressById,deleteAddressById,setDefaultAddressById } = require('../service/address.service');
const { addAddressError,getAddressListError,editAddressError,deleteAddressError,setDefaultAddressError } = require('../constant/err.type');
class addressController {
    async addAddress(ctx, next) {
        // 获取请求参数
        const userId = ctx.state.user.id;
        const { consignee,address,phone } = ctx.request.body;

        // 操作数据库
        try {
            const res = await createAddress({userId, address,consignee,phone});
            // 返回对应的结果
            ctx.body = {
                code: 0,
                message: '添加地址成功',
                result: res,
            };
        } catch (error) {
            console.log(error);
            ctx.app.emit('error', addAddressError, ctx);
        }
    }

    async getAddressList(ctx){
         // 获取请求参数
         const userId = ctx.state.user.id;
         // 操作数据库
         try {
             const res = await findAddressList(userId);
             console.log(res)
             // 返回对应的结果
             ctx.body = {
                 code: 0,
                 message: '获取地址列表成功',
                 result: res,
             };
         } catch (error) {
             console.log(error);
             ctx.app.emit('error', getAddressListError, ctx);
         }
    }

    async editAddress(ctx){
       
        try {
            const id = ctx.request.params.id;
            const { consignee,address,phone } = ctx.request.body;
            const addresses ={
                consignee,
                address,
                phone
            }
            const res = await updateAddressById(id,addresses)
            console.log(res)
            if(res){
                ctx.body = {
                    code: 0,
                    message: '修改地址成功',
                    result: '',
                };
            }
        } catch (error) {
            console.log(error);
            ctx.app.emit('error', editAddressError, ctx);
        }
    }

    async deleteAddress(ctx){
        try {
            const id = ctx.request.params.id;
            const res = await deleteAddressById(id)
            if(res){
                ctx.body = {
                    code: 0,
                    message: '删除地址成功',
                    result: '',
                };
            }
        } catch (error) {
            console.log(error);
            ctx.app.emit('error', deleteAddressError, ctx);
        }
    }

    async setDefaultAddress(ctx){
        try {
            const userId = ctx.state.user.id;
            const id = ctx.request.params.id;
            const res = await setDefaultAddressById(userId,id)
            if(res){
                ctx.body = {
                    code: 0,
                    message: '设置默认地址成功',
                    result: '',
                };
            }
        } catch (error) {
            console.log(error);
            ctx.app.emit('error', setDefaultAddressError, ctx);
        }
    }
   
   
}

module.exports = new addressController();
