const route=require('../routes/route')
let dotenv = require('dotenv').config();
let nonce = require('nonce')();
let request = require('request-promise');
const fs = require("fs");
const os = require("os");
class Services{
    install(req,res){

        let store = req.query.shop;
        if(store)
        {
            let API_KEY=process.env.API_KEY
            let scope=process.env.scope
            let home_url=process.env.home_url
            let state = nonce();
            let Url = 'https://' + store + '.myshopify.com/admin/oauth/authorize?client_id=' + API_KEY + '&scope=' + scope + '&redirect_uri=' + home_url + '/app/auth&state=' + state + '&grant_options[]=per-user';
            res.redirect(Url);
        }
        else
        {
            res.status(404).send('Shop Name Required');
        }
    }

    access_token(req,res){
        function setEnvValue(key, value) {

            // read file from hdd & split if from a linebreak to a array
            const ENV_VARS = fs.readFileSync("./.env", "utf8").split(os.EOL);
        
            // find the env we want based on the key
            const target = ENV_VARS.indexOf(ENV_VARS.find((line) => {
                return line.match(new RegExp(key));
            }));
        
            // replace the key/value with the new value
            ENV_VARS.splice(target, 1, `${key}=${value}`);
        
            // write everything back to the file system
            fs.writeFileSync("./.env", ENV_VARS.join(os.EOL));
        
        }
        let {shop, hmac, code, state} = req.query;
    
        if(shop && hmac && code){
            
            console.log("All Parameters Recieved Successfully");
    
            let acccessTokenRequesrUrl = 'https://' + shop + '/admin/oauth/access_token'
            let accessTokenPayLoad = {
                client_id : process.env.API_KEY,
                client_secret : process.env.API_sec_KEY,
                code
            }
    
            request.post(acccessTokenRequesrUrl,{json : accessTokenPayLoad}).then((accessTokenResponse)=>{
                let access_token = accessTokenResponse.access_token;
                console.log("Access Token " + access_token);
                setEnvValue("access_token",access_token)
                res.send("Access Tokens Received and stored in .env file");
            });
    }
    else
        res.status(404).send("Required Parameters Missing");
    }
}

module.exports=new Services()