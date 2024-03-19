const express = require("express")
const {register, alluser, deleteuser, updateuser} = require("../Controller/userController")
const {checkemail} = require("../Middleware/checkmail")
const Router = express.Router()

Router.post("/register",checkemail,register)
Router.get("/getuser",alluser)
Router.delete("/deluser/:id",deleteuser)
Router.post("/updateuser/:id",updateuser)

module.exports = Router