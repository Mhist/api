const { DataTypes } = require('sequelize');
const sequelize = require("../db/seq");

const User = sequelize.define('husi_user', {
  // 在这里定义模型属性
  // id会被sequelize自动创建、管理
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment:'用户名 唯一'
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment:'密码'
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment:'是否是管理员 0 不是管理员（默认）  1 是管理员',
    defaultValue: 0
  },

}, {
  // 这是其他模型参数
});

// `sequelize.define` 会返回模型
console.log(User === sequelize.models.User); // true


// User.sync({ force: true });
// console.log("用户模型表刚刚(重新)创建！");

module.exports = User