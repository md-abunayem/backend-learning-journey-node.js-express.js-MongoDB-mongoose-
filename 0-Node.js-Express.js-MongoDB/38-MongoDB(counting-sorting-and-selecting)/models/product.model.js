const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    price: {
        type: Number,
        required: true,
    },
    rating:{
        type: Number,
        required:true
    },
    description:String
},{timestamps:true})

const Product = mongoose.model('Products', productsSchema);

module.exports = Product;