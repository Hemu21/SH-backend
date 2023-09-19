const user = require("../data/user.js");
const model = require("mongoose").model;

const userModel = model("user",user)
module.exports = userModel