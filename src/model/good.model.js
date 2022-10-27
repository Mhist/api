const { DataTypes } = require('sequelize');
const sequelize = require("../db/seq");

const Good = sequelize.define('husi_good', {
  // 在这里定义模型属性
  // id会被sequelize自动创建、管理
  goodName: {
    type: DataTypes.STRING,
    allowNull: false,
    comment:'商品名称'
  },
  goodPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    comment:'商品价格'
  },
  goodNum: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment:'商品库存数量',
  },
  goodImg: {
    type: DataTypes.STRING,
    allowNull: false,
    comment:'商品图片url',
  },

}, {
  // 这是其他模型参数
});

// `sequelize.define` 会返回模型
// console.log(Good === sequelize.models.Good); // true


// Good.sync({ force: true });
// console.log("用户模型表刚刚(重新)创建！");

module.exports = Good