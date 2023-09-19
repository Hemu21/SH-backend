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


const accountSid = process.env.ACCOUNTSID 
const authToken = process.env.AUTHTOKEN 
const twilioClient = new twilio(accountSid, authToken)
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

app.get('/', (req, res) => {
	res.send(`Running ${PORT}`);
});

app.get("/api/v1/users",(req,res)=>{
    usersModel.find().then((ele)=>res.send(ele)).catch((ele)=>res.send(ele))
})


app.put("/api/v1/update-user",(req,res)=>{
    updateUserData(req,res)
})

app.put("/api/v1/update-users",(req,res)=>{
    updateUsersData(req,res)
})

  
app.post("/api/v1/sign",(req,res)=>{
    addUsersData(req.body).then((ele)=>{res.send(ele);console.log("send")}).catch((err)=>{res.send(err);console.log("error "+err)})
})


app.post("/api/v1/add-user-data",(req,res)=>{
    addUserData(req.body).then(()=>{res.send({"message":"added user data succussfully"})}).catch((ele)=>{res.send({"error":ele})})
})

app.post("/api/v1/login",(req,res)=>{
    login(req,res)
})

app.post('/api/v1/send-otp',async (req, res) => {
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

app.listen(PORT,()=>{console.log(`listening........ ${PORT}`)})
