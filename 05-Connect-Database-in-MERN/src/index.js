// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path:'./.env'
})

connectDB();











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