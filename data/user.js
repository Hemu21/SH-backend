const mongoose = require("mongoose")

const schema = mongoose.Schema
const user = new schema({
  _id:String,
  user_id:String,
  location:String,
  dp:String,
  status:String,
  notification:[],
  chats:[]
})

module.exports = user