const Good = require('../model/good.model');

class goodService {
    async createGood(goods) {
        // to do:写入数据库
        // 发布商品
        const res = await Good.create(goods);
        return res.dataValues;
    }

    async updateGoodById(id,goods) {
            const res = await Good.update(goods,{where:{id}})
            return res[0]>0 ? true : false;
    }

    async removeGood(id){
        const res = await Good.destroy({where:{id}})
        return res>0 ? true : false;
    }
    async restoreGoodById(id){
        const res = await Good.restore({where:{id}})
        return res>0 ? true : false;
    }
}
module.exports = new goodService();
