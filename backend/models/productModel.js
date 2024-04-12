const mongoose = require('mongoose');
//creating this schema to store the token in the database for resetting the password

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {

        type: String,
        required: [true, "Please enter the product name"],
        trim: true,
    },
    sku: {
        type: String,
        required: [true, "Please enter the product sku"],
        trim: true,
        default: "sku"
    },
    category: {
        type: String,
        required: [true, "Please enter the product category"],
        trim: true,
    },
    quantity: {
        type: String,
        required: [true, "Please enter the product quantity"],
    },
    price: {
        type: String,
        required: [true, "Please enter the product price"],
    },
    description: {
        type: String,
        required: [true, "Please enter the product description"],
    },
    image: {
        type: Object,
        default: {}
    }
},
    {
        timestamps: true
    }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
module.exports = Product;