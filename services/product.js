let dotenv = require('dotenv').config();
let request = require('request-promise');
let Product=require('../models/product_schema')

class Products{
    product_details(req,res){
        console.log("hi")
        let apiRequestUrl = 'https://' + process.env.SHOP + '/admin/api/2021-07/products.json';
        let apiRequestHeader = {
            'X-Shopify-Access-Token' : process.env.access_token
        };

        request.get(apiRequestUrl,{headers : apiRequestHeader})
        .then((apiResponse)=>{
            console.log("Products Retrieved Successfully");
            res.end(apiResponse);
        })
        .catch((err)=>{
            console.log(process.env.access_token)
            console.log(err);
            res.status(404).send("Something Went Wrong" + err);
        })
    }

    add_prod(req,res){
        let apiRequestUrl = 'https://' + process.env.SHOP + '/admin/api/2021-07/products.json';
        let apiRequestHeader = {
            'X-Shopify-Access-Token' : process.env.access_token,
            'content-type': 'application/json'
        };
        let product=req.body
        request.post({method:'POST',uri:apiRequestUrl,json:true,resolveWithFullResponse:true,headers : apiRequestHeader,body: product})
        .then(async(response)=>{
            console.log("Added");
            res.json(response.body);
            let prod=new Product(response.body.product);
            await prod.save();
            console.log(prod);
            console.log(response.body);
        })
        .catch((err)=>{
            //console.log(response);
            console.log(err);
            res.status(404).send("Wrong in adding prod"+err);
        })
    }

    get_prod(req,res){
        let id=req.query.id
        let apiRequestUrl = 'https://' + process.env.SHOP + '/admin/api/2021-07/products/'+id+'.json';
        let apiRequestHeader = {
            'X-Shopify-Access-Token' : process.env.access_token
        };
        request.get(apiRequestUrl,{headers : apiRequestHeader})
        .then((apiResponse)=>{
            console.log("Product Retrieved Successfully");
            res.end(apiResponse);
        })
        .catch((err)=>{
            //console.log(process.env.access_token)
            console.log(err);
            res.status(404).send("Something Went Wrong" + err);
        })
    }
    
    update_prod(req,res){
        let id=req.query.id
        let apiRequestUrl = 'https://' + process.env.SHOP + '/admin/api/2021-07/products/'+id+'.json';
        let apiRequestHeader = {
            'X-Shopify-Access-Token' : process.env.access_token,
            'content-type': 'application/json'
        };
        let product=req.body
        request.put({method:'PUT',uri:apiRequestUrl,json:true,resolveWithFullResponse:true,headers : apiRequestHeader,body: product})
        .then(async(apiResponse)=>{
            await Product.findOneAndUpdate({id:id},{$set:apiResponse.body.product})
            console.log("Product Updated Successfully");
            res.json(apiResponse);
        })
        .catch((err)=>{
            console.log(err);
            res.status(404).send("Something Went Wrong" + err);
        })
    }

    del_prod(req,res){
        let id=req.query.id
        let apiRequestUrl = 'https://' + process.env.SHOP + '/admin/api/2021-07/products/'+id+'.json';
        let apiRequestHeader = {
            'X-Shopify-Access-Token' : process.env.access_token
        };
        request.delete({method:'DELETE',uri:apiRequestUrl,headers:apiRequestHeader})
        .then(async(apiResponse)=>{
            await Product.findOneAndDelete({id:id});
            console.log("PRoduct deleted successfully");
            res.json(apiResponse)
        })
    }
}

module.exports=new Products()