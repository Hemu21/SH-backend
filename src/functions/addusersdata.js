const usersModel = require("../../models/usersModel")


const addUsersData =async (ele)=>{
    const add = new usersModel()
    add.$set({user_id:ele.user_id,email:ele.email,password:ele.password,call_id:ele.call_id,_id:ele.user_id,phno:ele.phno})
    const res = await add.save()
    return res
    
}

module.exports = addUsersData;
