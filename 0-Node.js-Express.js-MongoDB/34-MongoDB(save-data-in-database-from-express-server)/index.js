const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

const Product = require("./models/product.model");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/productsDB");
    console.log("DB is connected...!!!");
  } catch (error) {
    console.log("Some error is occured...!!!", error.message);
  }
};

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

//products route(post)
app.post("/products", async (req, res) => {
  //insert multiple items(static)
  // try {
  //   const newProducts = await Product.insertMany([
  //     {
  //       title: "Product A",
  //       price: 100,
  //       description: "Description A",
  //     },
  //     {
  //       title: "Product B",
  //       price: 200,
  //       description: "Description B",
  //     },
  //   ]);

  //   res.status(201).json({newProducts})
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
  try {
    const { title, price, description } = req.body;

    const newProduct = new Product({
      title,
      price,
      description,
    });

    const productData = await newProduct.save();
    res.status(201).json({ productData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Start the server
app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  await connectDB();
});
