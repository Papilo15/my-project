const express = require("express")
const path = require("path")
const ejs = require("ejs")
const server = express()
const mongodb = require("mongodb")
const mongoose = require("mongoose")
const dotenv = require("dotenv") 
const connectDB = require("./config/dbcon")
const user = require("./Model/user")
const bcrypt = require("bcrypt")
const bodyparser = require("body-parser")
server.use(bodyparser.urlencoded({extended:false}))
connectDB()vpo[-=


server.set("view engine","ejs")
server.set("views", path.join(__dirname,"views"))
server.use(express.static(path.join(__dirname, "public")))
server.get("/", (req,res)=>{
    res.send("Welcome")
})

const PORT = process.env.PORT

dotenv.config()

server.get("/homepage",(req,res)=>{
    res.render("index")
})



    //Registration
server.get("/register",(req,res)=>{
    res.render("register")
})
server.post("/registration", async(req, res)=>{
    const name = req.body.name.trim();
    const email = req.body.email.trim();
    const password = req.body.password.trim();
    const cpassword  = req.body.cpassword.trim();
    if(!name|| !email || !password || !cpassword){
        return res.status(422).json({error: "please fill the data"})
    }
    const userExist= await user.findOne({email:email});
    if(userExist){
        return res.status(422).json({error :"user already exist"});
    }
    else{
        const hash = await bcrypt.hash(password, 10)
        const profile = {
            name : name,
            email : email,
            isAdmin : false,
            password : hash,
            cpassword : cpassword
        }
        const feed = await user.create(profile)

        res.render("index")
    }
})
server.listen("2567", function(){
    console.log(`server is live on port 2567`);
    
})

const db = mongoose.connection;

db.once("open",()=>{
    console.log("connected to database");
    server.listen(PORT,()=>{
        console.log(`server is live on port ${PORT}`);
    })
})

db.on("close", ()=>{
    console.log("connection close");
    
})