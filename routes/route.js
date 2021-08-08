var express=require('express')
var router=express.Router()
const Services=require('../services/service')


router.get('/app',Services.install)
router.get('/app/auth',Services.access_token)

module.exports=router