const userModel = require("../../models/model")

const addUserData =async (ele)=>{
    const add = new userModel()
    add.$set({_id:ele.user_id+"data",user_id:ele.user_id,dp:ele.dp||"https://i.pinimg.com/736x/ed/46/f0/ed46f0aa9862f435c4f9b300f5ae1625.jpg",status:ele.status||"offline",notification:ele.notification||"",chats:ele.chats||"",location:"chats"})
    await add.save()
}

module.exports = addUserData;