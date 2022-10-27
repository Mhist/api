const Good = require('../model/good.model');

class goodService {
    async createGood(goods) {
        // to do:写入数据库
        // 发布商品
        const res = await Good.create(goods);

        return res.dataValues;
    }

    // async getgoodInfo({ id, goodName, password, isAdmin }) {
    //     const wehreOpt = {};
    //     // 根据名称查询数据库是否已经存在
    //     id && Object.assign(wehreOpt, { id });
    //     goodName && Object.assign(wehreOpt, { goodName });
    //     password && Object.assign(wehreOpt, { password });
    //     isAdmin && Object.assign(wehreOpt, { isAdmin });
    //     const res = await good.findOne({
    //         attributes: ['id', 'goodName', 'password', 'isAdmin'],
    //         where: wehreOpt,
    //     });

    //     return res ? res.dataValues : null;
    // }

    // async updateById({ id, goodName, password, isAdmin }) {
        
    //         const wehreOpt = { id };
    //         const newgood = {};
    //         goodName && Object.assign(newgood, { goodName });
    //         password && Object.assign(newgood, { password });
    //         isAdmin && Object.assign(newgood, { isAdmin });
    //         const res = await good.update(newgood, {
    //             where: wehreOpt,
    //         });
    //         return res[0]>0 ? true : false;
    // }
}
module.exports = new goodService();
