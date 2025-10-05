const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

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

//products route(get)
//for dynamic fetch base on user requirement->>http://localhost:3000/products?price=300
app.get('/products', async (req, res) => {
  try {
    //query(comparision) operators: $eq, $ne , $lt, $lte, $gte, $gt, in(array like price [200,222,44]), nin->{price : {$nin:[200,100,1000]}}

    //for dynamically getting price from users we can use query or route parameters
    //Example of query parameters
    const queryPrice = req.query.price;

    let products;
    if(queryPrice){
      products = await Product.find({price : {$gt: queryPrice}});
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
//http://localhost:3000/products/price
app.get('/products/:price', async (req, res) => {
  try {
    const routePrice = req.params.price;

    let product;
    if(routePrice){
      product = await Product.find({price:{$eq: routePrice}});
    }
    if (!product) {
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
