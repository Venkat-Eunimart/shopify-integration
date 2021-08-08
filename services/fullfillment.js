let dotenv = require('dotenv').config();
let request = require('request-promise');

class Payments{
    get_fullfillment(req,res){
        let apiRequestUrl = 'https://' + process.env.SHOP + '/admin/api/2021-07/locations.json';
        let apiRequestHeader = {
            'X-Shopify-Access-Token' : process.env.access_token
        };
        
        request.get(apiRequestUrl,{headers : apiRequestHeader})
        .then((apiResponse)=>{
            console.log("success");
            res.end(apiResponse);
        })
        .catch((err)=>{
            console.log(process.env.access_token)
            console.log(err);
            res.status(404).send("Something Went Wrong llll" + err);
        })
    }
    
    create_fulfullment_service(req,res){
        let id=req.query.id;
        console.log("lll")
        let apiRequestUrl = 'https://' + process.env.SHOP + '/admin/api/2021-07/orders/'+id+'/fulfillments.json';
        let apiRequestHeader = {
            'X-Shopify-Access-Token' : process.env.access_token,
            'content-type': 'application/json'
        };
        let fulfillment_request=req.body;
        request.post({method:'POST',uri:apiRequestUrl,json:true,resolveWithFullResponse:true,headers : apiRequestHeader,body: fulfillment_request})
        .then((apiResponse)=>{
            console.log("success");
            res.json("success")
        })
        .catch((err)=>{
            console.log(process.env.access_token)
            console.log(err);
            res.status(404).send("Something Went Wrong llll" + err);
        })

    }


}

module.exports=new Payments()