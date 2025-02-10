
// database connection

const mongoose = require("mongoose")

const connectDB = async() =>{
    try{
        const connectDB = await mongoose.connect("mongodb://localhost:27017/Ecommerce",{

        })
    }catch(error){
        console.log("connection error" + error);
        
    }
}

module.exports = connectDB