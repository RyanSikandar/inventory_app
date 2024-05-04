// Import any necessary modules or dependencies
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const becrypt = require('bcryptjs')
const Token = require('../models/tokenModel')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
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
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0), sameSite: "none", secure: true })
    return res.status(200).json({ message: "User succesfully logged out." })
})

//to get current user info 
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password")
    if (user) {
        const { _id, name, email, photo, phoneNumber, bio } = user
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phoneNumber,
            bio
        })
    }
    else {
        res.status(401)
        throw new Error("User not found.")

    }
})

const loginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token
    if (!token) {
        res.json(false)
    }
    //Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (verified) {
        return res.json(true)
    }
    res.send("User is logged in")
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        const { name, email, photo, phoneNumber, bio } = user
        user.email = email
        user.name = req.body.name || name
        user.photo = req.body.photo || photo
        user.phoneNumber = req.body.phoneNumber || phoneNumber
        user.bio = req.body.bio || bio
        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            photo: updatedUser.photo,
            phoneNumber: updatedUser.phoneNumber,
            bio: updatedUser.bio
        })
    }
    else {
        res.status(404)
        throw new Error("User not found")
    }
})
//change password
const changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
        res.status(400)
        throw new Error("Please provide old and new password")
    }

    if (user) {
        const isMatch = await becrypt.compare(oldPassword, user.password)
        if (isMatch) {
            user.password = newPassword
            const updatedUser = await user.save()
            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                photo: updatedUser.photo,
                phoneNumber: updatedUser.phoneNumber,
                bio: updatedUser.bio
            })
        }
        else {
            res.status(401)
            throw new Error("Invalid credentials, password does not match")
        }
    }
    else {
        res.status(404)
        throw new Error("User not found")
    }
})

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    if (!email) {
        res.status(400)
        throw new Error("Please provide an email")
    }
    const user = await User.findOne({ email })
    if (!user) {
        res.status(404)
        throw new Error("User not found")
    }
    //Delete token if it exists
    let tokenn = await Token.findOne({ userID: user._id })
    if (tokenn) {
        await tokenn.deleteOne()
    }

    //Create a reset token
    const resetToken = crypto.randomBytes(32).toString("hex") + user._id
    console.log(resetToken)
    //Hash the reset token
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    //Save the token in the db 
    const token = await Token.create({
        userID: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * 60 * 1000
    })
    await token.save()


    //Construct the reset url
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`

    //Construct the email message
    const message = `
    <p>You are receiving this email because you have requested to reset your password. Please follow this link to reset your password:</p>
    <p><a href="${resetUrl}" style="color: blue; text-decoration: underline;">${resetUrl}</a></p>
    <p>Regards,</p>
    <p>The Team</p>
`;


    const subject = "Password Reset Request"
    const send_to = user.email
    const sent_from = process.env.EMAIL_USER

    try {
        //send the email
        await sendEmail(sent_from, send_to, subject, message)
        res.status(200).json({ success: true, message: "Email sent" })
    }
    catch (e) {
        res.status(500)
        throw new Error("Email could not be sent, Please try again")
    }



});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
    const { resetToken } = req.params
    const { password } = req.body

    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    //Find the token in the db
    const userToken = await Token.findOne({
        token: hashedToken,
        expiresAt: { $gt: Date.now() }
    })
    if (!userToken) {
        res.status(400)
        throw new Error("Invalid or expired token")
    }

    //Find the user
    const user = await User.findById({ _id: userToken.userID })

    user.password = password
    await user.save()

    res.status(200).json({ success: true, message: "Password reset successful" })


})

// Export your controller functions
module.exports = {
    registerUser,
    resetPassword,
    loginUser,
    logoutUser, getUser, loginStatus, updateUser, changePassword, forgotPassword
};
