import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  content :{
    type: String,
    required : true,
  },
  complete:{
    type : Boolean,
    default : false,
  },
  createdBy : {
    type: mongoose.Schema.Types.ObjectId,     //get reference of other schema(like User)
    ref:"User"    // this is the "name" which is from model... not variable 
  },
  subTodos : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "SubTodo"
    }
  ]    //array of sub todos
},{timestamps:true})

export const Todo = mongoose.model("Todo", todoSchema);