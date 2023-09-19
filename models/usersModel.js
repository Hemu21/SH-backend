const users = require("../data/data.js");
const model = require("mongoose").model;

const usersModel = model("users",users)
module.exports = usersModel