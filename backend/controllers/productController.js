const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
cloudinary.config({
    cloud_name: 'dwupplpon',
    api_key: '981591959647158',
    api_secret: 'zE8zW8ZT3awOG4G4ZQagxd1TqkI'
});
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const { formatBytes } = require('../utils/fileUpload');

const createProduct = asyncHandler(async (req, res) => {
    const { name, sku, category, quantity, price, description } = req.body;
    //Validation 
    if (!name || !sku || !category || !quantity || !price || !description) {
        res.status(400)
        throw new Error("Please fill all the fields")
    }

    //Manage the image
    let fileData = {}
    //Check if the file is uploaded
    if (req.file) {
        let uploadedFile;
        //Upload the image to cloudinary
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, { folder: 'products', resource_type: "image" });
        }
        catch (error) {
            res.status(500)
            throw new Error("Image upload failed")
        }

        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: formatBytes(req.file.size, 2)
        }
    }



    //Create the product
    const product = await Product.create({
        user: req.user._id,
        name,
        sku,
        category,
        quantity,
        price,
        description,
        image: fileData
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
            description: product.description,
            image: product.image
        })
    } else {
        res.status(400)
        throw new Error("Invalid product data")
    }
})
// Get single product
const getProduct = asyncHandler(async (req, res) => {
    // Validate if the provided id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error("Invalid product ID");
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    if (product.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You are not authorized to view this product");
    }

    res.status(200).json(product);
});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
    // Validate if the provided id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error("Invalid product ID");
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    if (product.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You are not authorized to delete this product");
    }

    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Product removed" });
});

//Update product
const updateProduct = asyncHandler(async (req, res) => {
    // Validate if the provided id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error("Invalid product ID");
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    if (product.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You are not authorized to update this product");
    }

    const { name, category, quantity, price, description } = req.body;

    let fileData = {};
    if (req.file) {
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, { folder: 'products', resource_type: "image" });
        } catch (error) {
            res.status(500);
            throw new Error("Image upload failed");
        }

        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: formatBytes(req.file.size, 2)
        };
    }

    product.name = name || product.name;
    product.category = category || product.category;
    product.quantity = quantity || product.quantity;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = Object.keys(fileData).length == 0 ? product.image : fileData;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
});


// Get all products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ user: req.user._id }).sort("-createdAt");
    res.json(products);
});

module.exports = { createProduct, getProducts, getProduct, deleteProduct, updateProduct }