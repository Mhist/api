const User = require('../model/user.model');

class userService {
    async createUser(userName, password) {
         // to do:写入数据库
        // 创建一个新用户
        const res = await User.create({
            userName: userName,
            password: password,
        });
        console.log(res);
       
        return res.dataValues;
    }

    async getUserInfo({
        id,userName,password,isAdmin
    }) {
        const wehreOpt = {}
       // 根据名称查询数据库是否已经存在
        id && Object.assign(wehreOpt,{id})
        userName && Object.assign(wehreOpt,{userName})
        password && Object.assign(wehreOpt,{password})
        isAdmin && Object.assign(wehreOpt,{isAdmin})
        const res = await User.findOne({
            attributes:['id','userName','password','isAdmin'],
            where: wehreOpt
        })
      
       return res?res.dataValues:null;
   }






}
module.exports = new userService();
