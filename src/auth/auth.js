const jwt = require("jsonwebtoken");

const auth = (req)=>{
   const Secret_key = process.env.SECRET_KEY || "qwwqqqqqqqqq"
   return jwt.verify(req.cookies.token,Secret_key,(err,data)=>{if(data){return true}else{return false}})
}

module.exports = auth;
