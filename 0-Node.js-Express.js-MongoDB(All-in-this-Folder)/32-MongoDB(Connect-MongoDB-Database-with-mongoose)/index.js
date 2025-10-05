
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

//connect database-(way-1)
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/usersDB')
// .then(()=>{
//     console.log("DB is connected....!!!")
// })
// .catch((error)=>{
//     console.log("Some error is occured...!!!", error.message)
// });


//conncet database-(way-2)
//using async-await
const connectDB=async ()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/usersDB');
        console.log("DB is connected...!!!")
    } catch (error) {
        console.log("Some error is occured...!!!", error.message)
    }
}

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});


// Start the server
app.listen(PORT, async() => {
  console.log(`Server is running at http://localhost:${PORT}`);
  await connectDB();
});
