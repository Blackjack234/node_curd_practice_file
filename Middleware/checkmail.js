const usermodel= require("../Model/userModel")

const checkemail = async (req,res,next)=>{
 try{
    const validEmail = await usermodel.findOne({email:req.body.email})

    if(validEmail){
       res.status(400).json({
        status:400,
        message:"This email is already in use please use a different email"
       })
    }else{
        next()
    }

 }catch(err){
  res.status(500).json({
     status:500,
     message:"Erroer in check email"
  })
 }
}

module.exports = {
    checkemail
}