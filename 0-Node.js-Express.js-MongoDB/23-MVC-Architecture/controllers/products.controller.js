const path = require('path')

const products = require('../models/products.models.js')

const getProducts = (req, res)=>{
    res.sendFile(path.join(__dirname, '/../views', 'product.html'))
}

const saveProducts = (req, res)=>{
    const name = req.body.name;
    const price = req.body.price;
    const newProduct = {name, price}

    products.push(newProduct)
    res.send(products)
}

module.exports={getProducts, saveProducts}