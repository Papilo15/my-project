const { name } = require("ejs")
const mongoose = require("mongoose")
const Userschema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
     email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    },
    Date : {
        type : Date,
        default : Date.now,
    },
    
})
module.exports = mongoose.model("user", Userschema)