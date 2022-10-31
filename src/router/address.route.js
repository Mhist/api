const Router = require('koa-router');
const router = new Router({ prefix: '/address' });
const { auth } = require('../middleware/auth.middleware');
const { validatorAddress } = require('../middleware/address.middleware');
const {
    addAddress,
    getAddressList,
    editAddress,
    deleteAddress,
    setDefaultAddress
} = require('../controller/address.controller');
// 添加地址接口
router.post('/', auth,validatorAddress(
    {
        consignee:'string',
        phone: { type: 'string', format: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/ },
        address:{type: 'string',required:true}
    }
),  addAddress);

// 获取地址列表
router.get('/',auth,getAddressList)

// 修改地址接口
router.put('/:id',auth,validatorAddress(
    {
        consignee:'string',
        phone: { type: 'string', format: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/ },
        address:{type: 'string',required:true}
    }
),editAddress)

// 删除地址接口
router.delete('/:id',auth,deleteAddress)

// 设置默认地址
router.patch('/:id',auth,setDefaultAddress)
module.exports = router;
