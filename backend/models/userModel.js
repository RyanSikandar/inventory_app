const mongoose=require("mongoose");
const dotenv=require("dotenv").config();

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please provide a name"]
    },
    email:{
        type:String,
        required:[true,"Please provide an email"],
        unique:true,
        trim:true,
        RegExp: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please provide a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
        minLength:[6,"Password must be at least 6 characters long"],
        
    },
    photo:{
        type:String,
        required:[true,"Please provide a photo"],
        default:"no-photo.jpg",
    },
    phoneNumber:{
        type:String,
        required:[true,"Please provide a number"],
        default:"+920000000000",
    },
    bio:{
        type:String,
        required:[true,"Please provide a bio"],
        default:"Bio for the user",
        maxlength:[500,"Bio must be less than 500 characters"]
    }},
    {
        timestamps:true
    });

const User = mongoose.model("User",userSchema) || mongoose.models.User;
module.exports = User;