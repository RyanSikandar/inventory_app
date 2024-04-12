const express = require('express');
const { registerUser, loginUser, logoutUser, getUser, changePassword, loginStatus, updateUser, forgotPassword, resetPassword } = require('../controllers/userController');
const protect = require('../middleware/authmiddleware');
const router = express.Router();

// Define your user routes here
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser)
router.get("/getuser", protect, getUser)
router.get("/loggedin", loginStatus)
router.patch("/updateUser", protect, updateUser) //only logged in users can update their info
router.patch("/changePassword", protect, changePassword) //only logged in users can update their password
router.post("/forgotpassword", forgotPassword) //logged out users can request a password reset and also it is a post method because we are sending an email
router.put("/resetpassword/:resetToken", resetPassword)

module.exports = router;