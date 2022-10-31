const { DataTypes } = require('sequelize');
const sequelize = require("../db/seq");
const Good = require('./good.model')

const Cart = sequelize.define('husi_cart', {
  // 在这里定义模型属性
  // id会被sequelize自动创建、管理
  goodId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment:'商品id'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment:'用户id'
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment:'商品的数量',
    defaultValue:1
  },
  selected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment:'是否选中的状态',
    defaultValue:true
  },

}, {
  // 这是其他模型参数
//   paranoid: true,

//   // 如果要为 deletedAt 列指定自定义名称
//   deletedAt: 'destroyTime'
});

// `sequelize.define` 会返回模型
// console.log(Cart === sequelize.models.Cart); // true


// Cart.sync({ force: true });
// console.log("购物车表刚刚(重新)创建！");
Cart.belongsTo(Good,{
    foreignKey:'goodId',
    as:'goodInfo'
})
module.exports = Cart