const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require('./config/connectDB');
const app = express();
const PORT = process.env.PORT || 5000
const userRoute = require('./routes/userRoute');
const errorHandler = require('./middleware/errorMiddleware');
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

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
//middle ware for routes
app.use("/api/users",userRoute);
app.use(errorHandler);
startServer()
//Routes
app.get("/",(req,res)=>{
    res.send("hello from main page")
})
