const express = require('express');
const { createProduct } = require('../controllers/productController')
const protect = require('../middleware/authmiddleware');
const router = express.Router();
const { upload } = require('../utils/fileUpload');
// Define your product routes here
router.post("/", protect, upload.single("image"), createProduct);
//for mutliple images use upload.array("image", 3)


module.exports = router;