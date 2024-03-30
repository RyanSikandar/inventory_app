// Import any necessary modules or dependencies
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// Define your controller functions
const registerUser = asyncHandler(async (req, res) => {
    // if(!req.body.email){
    //     res.status(400)
    //     throw new Error("Please provide an email")
    // }
    // res.send("Register User")
    //using express-async-handler instead of try catch block

    const { name, email, password } = req.body
    // validation
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please provide all fields")
    }
    if (password.length < 6) {
        res.status(400)
        throw new Error("Password must be atleast 6 characters")
    }
    // Check if user email already exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }
    // Create a new user
    const newUser = await User.create({
        name,
        email,
        password
    })
    // Check if the user was successfully created
    if (newUser) {
        const { _id, name, email, photo, phoneNumber, bio } = newUser
        res.status(201).json({
            _id,
            name,
            email,
            photo,
            phoneNumber,
            bio
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
});
// Export your controller functions
module.exports = {
    registerUser
};
