const mongoose = require('mongoose');
//creating this schema to store the token in the database for resetting the password

const tokenSchema = new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true
    },
    expiresAt:{
        type:Date,
        requried:true
    }
});

const Token = mongoose.models.Token || mongoose.model('Token', tokenSchema);
module.exports = Token;