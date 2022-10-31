const { DataTypes } = require('sequelize');
const sequelize = require('../db/seq');

const Order = sequelize.define(
    'husi_order',
    {
        // 在这里定义模型属性
        // id会被sequelize自动创建、管理
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '用户id',
        },
        addressId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '地址id',
        },
        goodInfo: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: '商品信息',
        },
        total: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            comment: '订单总金额',
        },
        orderNumber:{
            type: DataTypes.CHAR(16),
            allowNull: false,
            comment: '订单号',
        },
        status:{
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue:0,
            comment: '订单状态 0未支付、1 已支付、2 已发货 3 已签收、4 取消',
        }
    },
    {
        // 这是其他模型参数
    }
);

// `sequelize.define` 会返回模型
// console.log(Order === sequelize.models.Order); // true

// Order.sync({ force: true });
// console.log('地址表刚刚(重新)创建！');

module.exports = Order;