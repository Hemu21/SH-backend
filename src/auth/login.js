const jwt = require("jsonwebtoken")
const usersModel = require("../../models/usersModel")

const login = async (req,res) => {
    const Secret_key = process.env.SECRET_KEY || "qwwqqqqqqqqq"
    if(req.cookies.token){
        
        jwt.verify(req.cookies.token,Secret_key,(err,data)=>{if(err){if(err.name==="TokenExpiredError"){res.clearCookie("token")}res.send({"error":err})}else{ usersModel.findOne({email:data.email}).then((ele)=>res.send(ele)).catch((ele)=>res.send(ele))}})
    }else{
        await res.cookie("token",jwt.sign({email:req.body.email},Secret_key,{algorithm:"HS512",expiresIn:"180h"}))
        res.send({"msg":"added to cookie"})

    }    
}

module.exports = login;