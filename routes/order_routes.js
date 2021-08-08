var express=require('express')
var router=express.Router()
const Orders=require('../services/order')


router.post('/app/add_order',Orders.add_order)
router.get('/app/get_order',Orders.get_order)
// router.put('/app/update_order',Orders.update_order)
router.delete('/app/del_order',Orders.del_order)


module.exports=router