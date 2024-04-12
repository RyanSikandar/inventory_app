const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const createProduct = asyncHandler(async (req, res) => {

    const { name, sku, category, quantity, price, description } = req.body;
    //Validation 
    if (!name || !sku || !category || !quantity || !price || !description) {
        res.status(400)
        throw new Error("Please fill all the fields")
    }

    //Manage the image

    //Create the product
    const product = await Product.create({
        user: req.user._id,
        name,
        sku,
        category,
        quantity,
        price,
        description
    })
    if (product) {
        res.status(201).json({
            _id: product._id,
            user: product.user,
            name: product.name,
            sku: product.sku,
            category: product.category,
            quantity: product.quantity,
            price: product.price,
            description: product.description
        })
    } else {
        res.status(400)
        throw new Error("Invalid product data")
    }
})

module.exports = { createProduct }