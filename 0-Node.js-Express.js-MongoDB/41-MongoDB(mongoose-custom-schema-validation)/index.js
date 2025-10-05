const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

//model import
const Product = require("./models/product.model");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  try {
    const { title, price, rating, description } = req.body;

    const newProduct = new Product({
      title,
      price,
      rating,
      description,
    });

    const productData = await newProduct.save();
    res.status(201).json({ productData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//products route(get)
//for dynamic fetch based on user requirement->>http://localhost:3000/products
app.get("/products", async (req, res) => {
  try {
    let products;

    products = await Product.find();
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json({ /*total,*/ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete products(delete)
app.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // const product = await Product.deleteOne({ _id: id });  //can not return deleted  product
    const product = await Product.findByIdAndDelete(id); //mongodb id
    // const product = await Product.findByIdAndDelete({ _id: id });
    //findByIdAndDelete will fetch the product,assign to a varible and delete then

    if (product) {
      res.status(200).json({
        message: "Deleted single product",
        success: true,
        data: product,
      });
    } else {
      res.status(404).json({
        message: "product is not found",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error is occured",
      success: false,
    });
  }
});

//update (put/patch)
//http://localhost:3000/products/6890f64b36c5c5eeba6b655c
app.put("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {title, price, rating, description}= req.body;   //from front-end or uisng postman

    // const updatedProduct = await Product.updateOne({ _id: id }, { $set: {title: title, price: price, rating: rating,description: description }});
    const updatedProduct = await Product.findByIdAndUpdate(id, { $set: {title: title, price: price, rating: rating,description: description }}, {new: true});  //to get return the updated product

    if(updatedProduct.matchedCount === 0){
      res.status(404).json({
        messgae: "Product is  not found",
        success : false
      })
    }
    res.status(201).json({
      message: "Updated successfull",
      data: updatedProduct
    })
    
  } catch (error) {
    res.status(500).json({message: "Error occured", success: false})
  }
});

// Start the server
app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  await connectDB();
});
