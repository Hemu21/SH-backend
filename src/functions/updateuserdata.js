const userModel = require("../../models/model.js")
const auth = require("../auth/auth.js")


const updateUserData = async (req,res) => {
    const isAllow = auth(req,res)
    if(!isAllow){
        const id = req.body.id
        const ele = req.body.data
        console.log(ele)
        const data = await userModel.findByIdAndUpdate(id,{$set:ele})
        res.send({"message":"user data updated"})
    }else{
        res.send({"message":"failed to update"})
    }
}

module.exports = updateUserData;
