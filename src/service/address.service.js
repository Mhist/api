const { where } = require('sequelize');
const Address = require('../model/address.model')
class addressService {
    async createAddress(params) {
        // to do:写入数据库
        // 创建一个新用户
        console.log({ ...params })
        const res = await Address.create({
           ...params

        });

        return res.dataValues;
    }


    async findAddressList(userId){
        const res = await Address.findAll({where:{userId}})
        return res
    }

    async updateAddressById(id,addresses){
        const res = await Address.update(addresses,{where:{id}})
        return res[0]>0 ? true : false;
    }

    async deleteAddressById(id){
        const res = await Address.destroy({where:{id}})
        console.log(res)
        return res>0 ? true : false;
    }

    async setDefaultAddressById(userId,id){
        await Address.update({
            isDefault:false
        },
     {   where:{
            userId,
        }}
        )

        return await Address.update(
            {isDefault: true},
            {
                where:{
                    id,
                }
            }
        )
    }


   
}
module.exports = new addressService();