const  mongoose = require("mongoose"); 
const  {DB_NAME} = require("../constants.js");


const connectDB = async()=>{
    try {
        const connection = await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`)

        console.log(` \n MONGODB connected !! DB HOST ${connection.connection.host}`)

    } catch (error) {
        console.log("MONGODB connection error ", error);
        process.exit(1)
    }
}

module.exports = connectDB;