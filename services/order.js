let dotenv = require('dotenv').config();
let request = require('request-promise');
let Order=require('../models/order_schema')

class Orders{
 
    add_order(req,res){
        let apiRequestUrl = 'https://' + process.env.SHOP + '/admin/api/2021-07/orders.json';
        let apiRequestHeader = {
            'X-Shopify-Access-Token' : process.env.access_token,
            'content-type': 'application/json'
        };
        let order=req.body
        request.post({method:'POST',uri:apiRequestUrl,json:true,resolveWithFullResponse:true,headers : apiRequestHeader,body: order})
        .then(async(response)=>{
            console.log("Added");
            res.json(response.body);
            let order=new Order(response.body.order);
            await order.save();
            console.log(order);
            console.log(response.body);
        })
        .catch((err)=>{
            console.log(err);
            res.status(404).send("Wrong in adding order"+err);
        })
    }

    get_order(req,res){
        let id=req.query.id
        let apiRequestUrl = 'https://' + process.env.SHOP + '/admin/api/2021-07/orders/'+id+'.json';
        let apiRequestHeader = {
            'X-Shopify-Access-Token' : process.env.access_token
        };
        request.get(apiRequestUrl,{headers : apiRequestHeader})
        .then((apiResponse)=>{
            console.log("Order Retrieved Successfully");
            res.json(apiResponse);
        })
        .catch((err)=>{
            //console.log(process.env.access_token)
            console.log(err);
            res.status(404).send("Something Went Wrong" + err);
        })
    }

    // update_order=async(req,res)=>{
    //     let id=req.query.id
    //     let apiRequestUrl = 'https://' + process.env.SHOP + '/admin/api/2021-07/orders/'+id+'.json';
    //     let apiRequestHeader = {
    //         'X-Shopify-Access-Token' : process.env.access_token,
    //         'content-type': 'application/json'
    //     };
    //     let order=req.body
    //     request.put({method:'PUT',uri:apiRequestUrl,json:true,resolveWithFullResponse:true,headers : apiRequestHeader,body: order})
    //     .then(async(apiResponse)=>{
    //         await Order.findOneAndUpdate({id:id},{$set:apiResponse.body.order})
    //         console.log("Order Updated Successfully");
    //         res.json(apiResponse);
    //     })
    //     .catch((err)=>{
    //         //console.log(process.env.access_token)
    //         console.log(err);
    //         res.status(404).send("Something Went Wrong" + err);
    //     })
    // }

    del_order(req,res){
        let id=req.query.id
        let apiRequestUrl = 'https://' + process.env.SHOP + '/admin/api/2021-07/orders/'+id+'.json';
        let apiRequestHeader = {
            'X-Shopify-Access-Token' : process.env.access_token
        };
        request.delete({method:'DELETE',uri:apiRequestUrl,headers:apiRequestHeader})
        .then(async(apiResponse)=>{
            await Order.findOneAndDelete({id:id});
            console.log("Order deleted successfully");
            res.json(apiResponse)
        })
    }
}

module.exports=new Orders()