const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")


const Securepass = async (password)=>{
    try{
       const newpass = await bcryptjs.hash(password.toString(),10)
       return newpass
    }catch(err){
      res.status(404).json({
        status:404,
        message:"secure pass error"
      })
    }
}

module.exports = {
    Securepass
}