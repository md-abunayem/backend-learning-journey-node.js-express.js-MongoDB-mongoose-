// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path:'./.env'
})

connectDB()       //async function return a promise
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`The server is runnig on the port: ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("MongoDB connection failed !!! ", error)
})











//connect using in one file
/*
;(async()=>{            //can use  function instead of IIFE
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on('error',()=>{
            console.log("ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`Server is runnig on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error('ERROR: ',error );
        throw error
    }
})();*/