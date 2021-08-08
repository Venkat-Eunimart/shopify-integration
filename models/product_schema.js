const mongoose = require('mongoose')

const product_schema = new mongoose.Schema({
    id: {type:Number,require:true},
    title: {type:String,require:true},
    body_html: {type:String,require:true},
    vendor: {type:String,require:true},
    product_type: {type:String,require:true},
    created_at: {type:String,require:true},
    handle: {type:String,require:true},
    updated_at: {type:String,require:true},
    published_at: {type:String,require:true},
    template_suffix: {type:String,require:false},
    created_at: {type:String,require:true},
    handle: {type:String,require:true},
    updated_at: {type:String,require:true},
    published_at: {type:String,require:true},
    template_suffix: {type:String,require:false},
    status: {type:String,require:true},
    published_scope: {type:String,require:true},
    tags: {type:String,require:true},
    admin_graphql_api_id: {type:String,require:true},
    variants: {type:Array,require:false},
    options: {type:Array,require:false},
    images: {type:Array,require:false},
    image: {type:String,require:false}
})
module.exports = mongoose.model('Product',product_schema)