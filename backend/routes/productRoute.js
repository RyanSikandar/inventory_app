const express = require('express');
const { createProduct, getProducts, getProduct, deleteProduct, updateProduct } = require('../controllers/productController')
const protect = require('../middleware/authmiddleware');
const router = express.Router();
const { upload } = require('../utils/fileUpload');
// Define your product routes here
router.post("/", protect, upload.single("image"), createProduct);

router.get("/allProducts", protect, getProducts)

router.get("/:id", protect, getProduct)

router.delete("/:id", protect, deleteProduct)

router.patch("/:id", protect, upload.single("image"), updateProduct)

//for mutliple images use upload.array("image", 3)


module.exports = router;