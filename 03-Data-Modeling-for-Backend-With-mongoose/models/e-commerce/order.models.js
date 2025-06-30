import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({   //it will only use in this file-->> we can separate this to other individual file
  procuctId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Product"
  },
  quantity: {
    type: Number,
    required: true
  }

})

const orderSchema = new mongoose.Schema({
  orderPrice: {
    type: Number,
    required: true
  },
  customer : {
    type: mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  orderItems : {
    type : [orderItemSchema]     //pass schema to access all properties --->> it is an array to store multiple product and multiple product can have different quantity
  },
  address : {
    type: Stirng,
    required: true
  },
  status : {
    type: String,
    enum : ["PENDING", "CANCELLED", "DELIVERED", "ON THE WAY"],     //enum provide options -->>> choose from the element(strict)
    default : "PENDING"
  }
},{timestamps: true})

export const Order = mongoose.model("Order", orderSchema);