const Order = require('../model/order.model');
class orderService {
    async createOrder(params) {
        // to do:写入数据库
        const res = await Order.create(params);

        return res.dataValues;
    }

    async findOrderList(pageNum, pageSize, status) {
        const {count,rows} = await Order.findAndCountAll({
            where: {
                status
            },
            offset: (pageNum - 1) * pageSize,
            limit: pageSize * 1,
        });
        return {
            pageNum,
            pageSize,
            total:count,
            list:rows
        };
    }

    async updateOrderById(id, orderes) {
        const res = await Order.update(orderes, { where: { id } });
        console.log(res)
        return res[0] > 0 ? true : false;
    }
}
module.exports = new orderService();
