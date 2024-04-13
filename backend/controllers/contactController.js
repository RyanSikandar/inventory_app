const asyncHandler = require('express-async-handler');

const contactUs = asyncHandler(async (req, res) => {
    const { subject, message } = req.body

    if (!subject || !message) {
        res.status(400)
        throw new Error("Please fill in all fields")
    }
    res.status(200).json({ message: "Thank you for contacting us, we will get back to you shortly" })

})

module.exports = { contactUs }