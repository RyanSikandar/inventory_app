const express = require('express');
const {registerUser,loginUser,logoutUser,getUser,loginStatus,updateUser} = require('../controllers/userController');
const protect = require('../middleware/authmiddleware');
const router = express.Router();

// Define your user routes here
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",logoutUser)
router.get("/getuser",protect,getUser)
router.get("/loggedin",loginStatus)
router.patch("/updateUser",protect,updateUser) //only logged in users can update their info

module.exports = router;