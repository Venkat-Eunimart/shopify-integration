let dotenv = require('dotenv').config();
let request = require('request-promise');

class Transaction{
    create(req,res){
        let id=req.query.id;
        let apiRequestUrl = 'https://' + process.env.SHOP + '/admin/api/2021-07/orders/'+id+'/transactions.json';
        let apiRequestHeader = {
            'X-Shopify-Access-Token' : process.env.access_token,
            'content-type': 'application/json'
        };
        let transaction=req.body;
        request.post({method:'POST',uri:apiRequestUrl,json:true,resolveWithFullResponse:true,headers : apiRequestHeader,body: transaction})
        .then((apiResponse)=>{
            console.log("success");
            console.log(apiResponse)
        })
        .catch((err)=>{
            console.log(err);

        })

    }

    get(req,res){
        let id=req.query.id;
        let apiRequestUrl = 'https://' + process.env.SHOP + '/admin/api/2021-07/orders/'+id+'/transactions.json';
        let apiRequestHeader = {
            'X-Shopify-Access-Token' : process.env.access_token,
            'content-type': 'application/json'
        };

        request.get(apiRequestUrl,{headers : apiRequestHeader})
        .then((apiResponse)=>{
            console.log("Product Retrieved Successfully");
            res.end(apiResponse);
        })
        .catch((err)=>{
            console.log(process.env.access_token)
            console.log(err);
            res.status(404).send("Something Went Wrong llll" + err);
        })

    }
    
}




module.exports=new Transaction()