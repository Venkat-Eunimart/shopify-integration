var express=require('express')
var router=express.Router()
const fullfillment=require('../services/fullfillment')

router.get('/app/fullfillment',fullfillment.get_fullfillment)
router.post('/app/createService',fullfillment.create_fulfullment_service)


module.exports=router