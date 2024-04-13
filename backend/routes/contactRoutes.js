const express = require('express');
const protect = require('../middleware/authmiddleware');
const router = express.Router();
const { contactUs } = require('../controllers/contactController');
// Define your contact routes here
router.post("/", protect, contactUs)

module.exports = router;