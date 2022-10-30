const Cart = require('../model/cart.model');

class cartService {
    async createOrUpdateCart(userId,goodId){
        return {
            id:1,
            userId:13,
            goodId:1,
            number:1,
            selected: true,

        }
    }
}

module.exports = new cartService()