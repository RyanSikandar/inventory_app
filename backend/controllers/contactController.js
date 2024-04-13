const asyncHandler = require('express-async-handler');

const contactUs = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Your message has been sent successfully"
    })
})

module.exports = { contactUs }