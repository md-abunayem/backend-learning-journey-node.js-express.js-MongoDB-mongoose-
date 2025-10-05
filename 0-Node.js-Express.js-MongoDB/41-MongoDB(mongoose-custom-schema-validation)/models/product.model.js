const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [5, "Length of the product name must be more than or equal 5"],
        maxLength: [30, "Length of the product name must be more than or equal 30"],
        trim : true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Minimum peice can be 0"],
        max : [10000000000, "Maximum price of the product can be 10000000000"],
    },
    //custom schema validation on phone number
    /*
    phone:{
        type: String,
        required: [true, 'User phone number required'],
        validate: {
            validator: function (v){
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props=>`${props.value} is not a valid number!`
        }   //format of the number is =>> 023-344-4556
    },*/
    // email: {
    //     type: String,
    //     unique: true, 
    //     require: true
    // },
    //we can use "enum"  to give specified values that can select users like radio button
    rating:{
        type: Number,
        required:true
    },
    description:String
},{timestamps:true})

const Product = mongoose.model('Products', productsSchema);

module.exports = Product;