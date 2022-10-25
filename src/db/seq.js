const { Sequelize } = require('sequelize');
const {MYSQL_DB,MYSQL_USER,MYSQL_PASSWORD,MYSQL_HOST,MYSQL_PORT} = require('../config/config.default')
// 方法 3: 分别传递参数 (其它数据库)
const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    port:MYSQL_PORT,
    dialect: 'mysql',/* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
    timezone:'+08:00'
  });

 sequelize.authenticate()
          .then(()=>{
            console.log("连接数据库成功")
          })
          .catch(err =>{
            console.log("连接数据库失败",err)
          })

module.exports = sequelize

