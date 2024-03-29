const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    image:{
        type:Array
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const userModel = mongoose.model("user",userSchema)
module.exports = userModel