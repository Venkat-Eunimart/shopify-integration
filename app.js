var express= require('express')
let app = express()
let dotenv = require('dotenv').config();
let Route=require('./routes/route')
let Prod=require('./routes/prod_routes')
let Order=require('./routes/order_routes')
let fullfillment=require('./routes/fullfillment')
let transaction=require('./routes/transaction')
let mongoose=require('mongoose')

mongoose.connect(process.env.db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB CONNECTED SUCCESSFULLY")
    })
    .catch(err => {
        console.log("DB CONNECTED FAILED!!!")
        console.log(err)
    })
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000,()=>{
    console.log("Server started at:"+3000)
})

app.use('/transaction',transaction)
app.use('/full',fullfillment)
app.use('/order',Order)
app.use('/prod',Prod)
app.use('/',Route)