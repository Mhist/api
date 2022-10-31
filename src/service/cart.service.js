const { Op } = require('sequelize');
const Cart = require('../model/cart.model');
const Good = require('../model/good.model');

class cartService {
    async createOrUpdateCart(userId, goodId) {
        // 根据userId和goodId同时查找，有没有记录
        let res = await Cart.findOne({
            where: {
                [Op.and]: {
                    userId,
                    goodId,
                },
            },
        });
        if(res){
            // 已经存在一条记录,将number加1
          await  res.increment('number')
          return await res.reload() 
        }else{
          return await  Cart.create({
            userId,
            goodId
          })
        }
    }

    async findCartAllList(pageNum,pageSize){
        const offset = (pageNum-1)*pageSize
        const {count,rows} =  await Cart.findAndCountAll({
            attributes:['id','number','selected'],
            offset:offset,
            limit:pageSize*1,
            include:{
                model:Good,
                as:'goodInfo',
                attributes:['id','goodName','goodImg','goodPrice']
            }
        })
        return {
            pageNum,
            pageSize,
            total:count,
            list:rows
        }
    }

    async updateCartInfo(params){
        console.log(params)
        const {id,number,selected} = params
        const res = await Cart.findByPk(id)
        console.log(res,"***********")
        if(!res) return ''
        number !== undefined ? (res.number = number):''
        selected !== undefined ? (res.selected = selected):''
        await res.save()
        return res
    }

    async removeCart(ids){
        console.log(ids)
        const res =  await Cart.destroy({
            where:{
                id:{
                    [Op.in]:ids
                }
            }
        })
    return res
    }
 
    async selectAlls(userId){
      return await  Cart.update({
            selected:true
        },
        {
            where:{
                userId
            }
        }
        )
    }

    
    async unSelectAlls(userId){
        return await  Cart.update({
              selected:false
          },
          {
              where:{
                  userId
              }
          }
          )
      }
}

module.exports = new cartService();
