var express=require('express')
var router=express.Router()
const Products=require('../services/product')

router.get('/app/product_details',Products.product_details)
router.post('/app/add_prod',Products.add_prod)
router.get('/app/get_prod',Products.get_prod)
router.put('/app/update_prod',Products.update_prod)
router.delete('/app/del_prod',Products.del_prod)

module.exports=router