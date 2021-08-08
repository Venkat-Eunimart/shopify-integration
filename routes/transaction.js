var express=require('express')
var router=express.Router()
const Transaction=require('../services/transaction')



router.post('/app/createtransactions',Transaction.create)
router.get('/app/get',Transaction.get)


module.exports=router