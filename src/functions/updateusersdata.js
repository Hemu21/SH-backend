const usersModel = require("../../models/usersModel");
const auth = require("../auth/auth.js")


const updateUsersData = async (req,res) => {
    const isAllow = auth(req,res)
        const id = req.body.id
        const ele = req.body.data
        console.log(ele)
        const data = await usersModel.findByIdAndUpdate(id,{$set:ele})
        res.send({"message":"user data updated"})
    }
module.exports = updateUsersData;
