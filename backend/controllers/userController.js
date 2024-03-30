// Import any necessary modules or dependencies
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const becrypt = require('bcryptjs')
//we dont use local storage to store token, we use cookies because local storage is not secure and can be accessed by javascript code


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
};
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
    //Genearate the token for the user
    const token = generateToken(newUser._id)

    //Send http only cookie 
    res.cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000), sameSite: "none", secure: true })
    //same site means front end and backend are on different domains
    //secure means it is only sent over https

    // Check if the user was successfully created
    if (newUser) {
        const { _id, name, email, photo, phoneNumber, bio } = newUser
        res.status(201).json({
            _id,
            name,
            email,
            photo,
            phoneNumber,
            bio,
            token
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
});

//Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // Validation request
    if (!email || !password) {
        res.status(400)
        throw new Error("Please provide email and password")
    }
    //Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
        res.status(401)
        throw new Error("Invalid credentials, user does not exist")
    }
    //User exists, Check if password matches
    const isMatch = await becrypt.compare(password, user.password)
     //Genearate the token for the user
     const token = generateToken(user._id)

     //Send http only cookie 
     res.cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000), sameSite: "none", secure: true })
     //same site means front end and backend are on different domains
     //secure means it is only sent over https

    if (user && isMatch) {
        const { _id, name, email, photo, phoneNumber, bio } = user
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phoneNumber,
            bio,
            token
        })
    }
    else {
        res.status(401)
        throw new Error("Invalid credentials.")

    }

    if (!isMatch) {
        res.status(401)
        throw new Error("Invalid credentials, password does not match")
    }
})

// Export your controller functions
module.exports = {
    registerUser,
    loginUser
};
