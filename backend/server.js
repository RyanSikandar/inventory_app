const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require('./config/connectDB');
const app = express();
const PORT = process.env.PORT || 5000

//Connect to mongo db and start server 

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);;
        })
    }
    catch (error) {
        console.log(error)
    }
}
startServer()
