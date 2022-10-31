const Path = require('path');
const {
    addToCartError,
    getCartListError,
    updateCartError,
    cartFormatError,
    deleteCartError,
    selectCartError,
    unSelectCartError
} = require('../constant/err.type');
const {
    createOrUpdateCart,
    findCartAllList,
    updateCartInfo,
    removeCart,
    selectAlls,
    unSelectAlls
} = require('../service/cart.service');
class cartController {
    async addToCart(ctx) {
        try {
            // 将商品添加到购物车
            // 1.解析user_id、goods_id
            const userId = ctx.state.user.id;
            const goodId = ctx.request.body.goodId;
            // 2.操作数据库
            const res = await createOrUpdateCart(userId, goodId);
            console.log(res);
            // 3.返回结果
            ctx.body = {
                code: 0,
                message: '添加到购物车成功',
                result: res,
            };
        } catch (error) {
            console.error(error, '添加到购物车失败');
            ctx.app.emit('error', addToCartError, ctx);
            return;
        }
    }

    async findCartList(ctx) {
        try {
            // 1.解析请求参数
            // 2.操作数据库
            // 3.返回结果
            const { pageNum = 1, pageSize = 10 } = ctx.request.query;
            console.log(pageNum, pageSize);
            const res = await findCartAllList(pageNum, pageSize);
            ctx.body = {
                code: 0,
                message: '获取购物车列表成功',
                result: res,
            };
        } catch (error) {
            console.error(error, '获取购物车列表失败');
            ctx.app.emit('error', getCartListError, ctx);
            return;
        }
    }

    async updateCart(ctx) {
        try {
            // 1.解析请求参数
            // 2.操作数据库
            // 3.返回结果
            const { id } = ctx.request.params;
            const { number, selected } = ctx.request.body;
            if (number === undefined && selected === undefined) {
                console.error('更新购物车列表失败');
                cartFormatError.message = 'number和selected不能同时为空';
                ctx.app.emit('error', cartFormatError, ctx);
                return;
            }
            const res = await updateCartInfo({ id, number, selected });
            ctx.body = {
                code: 0,
                message: '更新购物车列表成功',
                result: res
            };
        } catch (error) {
            console.error(error, '更新购物车列表失败');
            ctx.app.emit('error', updateCartError, ctx);
            return;
        }
    }

    async deleteCart(ctx){
        const {ids} = ctx.request.body
        const res = await removeCart(ids)
        try {
            ctx.body = {
                code: 0,
                message: '删除购物车成功',
                result: res
            };
        } catch (error) {
            console.error(error, '删除购物车列表失败');
            ctx.app.emit('error', deleteCartError, ctx);
            return;
        }
    }

    async selectAll(ctx){
        try {
            // 获取用户id
            const userId = ctx.state.user.id
            // 操作数据库
            // 返回收到影响的行数
            const res = await selectAlls(userId)
            console.log(res)
            //返回结果
            ctx.body = {
                code: 0,
                message: '全选购物车成功',
                result: res
            };
        } catch (error) {
            console.error(error, '全选购物车失败');
            ctx.app.emit('error', selectCartError, ctx);
            return;
        }
    }

    async unSelectAll(ctx){
        try {
            // 获取用户id
            const userId = ctx.state.user.id
            // 操作数据库
            // 返回收到影响的行数
            const res = await unSelectAlls(userId)
            console.log(res)
            //返回结果
            ctx.body = {
                code: 0,
                message: '全不选购物车成功',
                result: res
            };
        } catch (error) {
            console.error(error, '全不选购物车失败');
            ctx.app.emit('error', unSelectCartError, ctx);
            return;
        }
    }
}

module.exports = new cartController();
