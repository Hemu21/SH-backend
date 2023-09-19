const express = require("express")
const cookie = require("cookie-parser");
const cors = require("cors")
const twilio = require("twilio");
const usersModel = require("./models/usersModel.js")
const addUsersData = require("./src/functions/addusersdata.js");
const addUserData = require("./src/functions/adduserdata.js")
const login = require("./src/auth/login.js");
const updateUserData = require("./src/functions/updateuserdata.js");
const updateUsersData = require("./src/functions/updateusersdata.js");


const accountSid = process.env.ACCOUNTSID || "ACcc26f6bce8a2dd33e11ed13bb64cbf9f";
const authToken = process.env.AUTHTOKEN || "9d394722be5b489478eab1bf68cf65c8";
const twilioClient = new twilio(accountSid, authToken);
const myNumber = process.env.MYNUMBER || "+18052033564"
const PORT = process.env.PORT || 3000
var otpStore = {};

// Generate a random OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}





const app = express()


app.use(express.json())
app.use(cookie())
app.use(cors())



app.get("/users",(req,res)=>{
    usersModel.find().then((ele)=>res.send(ele)).catch((ele)=>res.send(ele))
})


app.put("/update-user",(req,res)=>{
    updateUserData(req,res)
})

app.put("/update-users",(req,res)=>{
    updateUsersData(req,res)
})

  
app.post("/sign",(req,res)=>{
    addUsersData(req.body).then((ele)=>{res.send(ele);console.log("send")}).catch((err)=>{res.send(err);console.log("error "+err)})
})


app.post("/add-user-data",(req,res)=>{
    addUserData(req.body).then(()=>{res.send({"message":"added user data succussfully"})}).catch((ele)=>{res.send({"error":ele})})
})

app.post("/login",(req,res)=>{
    login(req,res)
})

app.post('/api/send-otp',async (req, res) => {
    const  mobileNumber  = req.body.mobileNumber;
    const otp = generateOTP();
    console.log(mobileNumber)
    try {
      // Send the OTP via Twilio SMS
      await twilioClient.messages.create({
        body: `Your OTP is: ${otp}`,
        from: myNumber,
        to: mobileNumber,
      });
  
    
      res.send({ message: 'OTP sent successfully',otp:otp });
    } catch (error) {
      console.error('Error sending OTP:', error);
      res.json({ error: error });
    }
  })

module.exports = app;

app.listen(3000,()=>{console.log("listening........")})