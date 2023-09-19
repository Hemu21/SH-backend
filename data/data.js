const mongoose = require("mongoose");
const dot = require("dotenv")
const path = require("path")

dot.config(path.join(__dirname,"../.env"))
const user = process.env.USER || "Hemu21"
const password = process.env.PASSWORD || "20052018";
mongoose.connect(`mongodb+srv://${user}:${password}@user.0bn426g.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => console.log("connected to user")).catch((err)=>console.log(err))




const schema = mongoose.Schema
  
const users = new schema({
    _id:String,
    user_id:String,
    email:String,
    phno:String,
    password:String,
    call_id:String
  })
  
  module.exports = users