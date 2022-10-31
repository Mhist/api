const { DataTypes } = require('sequelize');
const sequelize = require('../db/seq');

const Address = sequelize.define(
    'husi_address',
    {
        // 在这里定义模型属性
        // id会被sequelize自动创建、管理
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '用户id',
        },
        consignee: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '收货人姓名',
        },
        phone: {
            type: DataTypes.CHAR(11),
            allowNull: false,
            comment: '收货人手机号',
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '收货人地址',
        },
        isDefault:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            comment: '是否为默认地址 0 不是默认地址； 1 是默认地址',
            defaultValue: false
        }
    },
    {
        // 这是其他模型参数
    }
);

// `sequelize.define` 会返回模型
// console.log(Address === sequelize.models.Address); // true

// Address.sync({ force: true });
// console.log('地址表刚刚(重新)创建！');

module.exports = Address;
