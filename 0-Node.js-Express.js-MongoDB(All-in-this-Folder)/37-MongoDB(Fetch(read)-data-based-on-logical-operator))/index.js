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
    const { title, price, rating ,description } = req.body;

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
//for dynamic fetch base on user requirement->>http://localhost:3000/products?price=300&rating=4.2
app.get('/products', async (req, res) => {
  try {
    const {price,rating} = req.query;

    let products;
    if(price || rating){  //can use "and" here
      //operators--->>> and, or, not, nor
      //for not-->> Product.find({ price: { $not: { $gte: 100 } } })
      products = await Product.find({$or: [{price :{$gt: price}}, {rating : {$gte : rating}}]});
    }else{
      products = await Product.find();
    }
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//Read specific product by route parameter(e.g. price, category, etc)
//http://localhost:3000/products/3000/4.5
app.get('/products/:price/:rating', async (req, res) => {
  try {
    const {price,rating} = req.params;

    let product;
    if(price && rating){
      products = await Product.find({$and:[{price : {$gte: price}}, {rating: {$lt:rating}}]});
    }
    if (products.length === 0) {
      return res.status(404).json({ message: 'No product found' });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Start the server
app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  await connectDB();
});
