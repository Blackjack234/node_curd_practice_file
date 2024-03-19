const usermodel = require("../Model/userModel")
const path = require("node:path")
const {Validator} = require("node-input-validator")

const { Securepass }= require("../utili/utils")

const register = async (req,res)=>{
    try{
     const {name,email,phone,password} = req.body
     const values = new Validator(req.body,{
        name:"required|minLength:3",
        email:"required|email",
        phone:"required",
        password:"required"
     })
     const matched = await values.check()
     if(!matched){
        res.status(400).json({
              status:400,
              message:values?.errors
        })
     }else{
        const hashpass = await Securepass(password)
       const userdata = new usermodel({
        name,
        email,
        phone,
        password:hashpass
       })

       const result = await userdata.save()

       if(!result){
           res.status(400).json({
            status:400,
            message:"user not added,Error!!"
           })
       }else{
         res.status(200).json({
            status:200,
            message:"user added Successfully",
            data:result
         })
       }
     }
    }catch(err){
       res.status(500).json({
        status:500,
        message:err.message
       })
    }
}

const alluser = async(req,res)=>{
 try{
    const allusers = await usermodel.find()
    if(!allusers){
     res.status(400).json({
        status:400,
        message:"No user found"
     })
    }else{
        res.status(200).json({
           status:200,
           message:"User found successful",
           data:allusers
        })
    }

 }catch(err){
res.status(500).json({
  status:500,
  message:err.message
})
 }
}
const deleteuser = async (req,res)=>{
    try{
      const _id = req.params.id;
      const delresult = await usermodel.findByIdAndDelete(_id)
      if(!delresult){
         res.status(400).json({
            status:400,
            message:"delete not done.. Error!!"
         })
      }else{
        res.status(200).json({
          status:200,
          message:"delete is done successfully"
        })
      }
    }catch(err){
    res.status(500).json({
        status:500,
        message:err.message
    })
    }
}

const updateuser = async (req,res)=>{
    try{
          const  id = req.params.id;
          const updateresult = await usermodel.findByIdAndUpdate({_id:id},req.body,{
            useFindAndModify:false,
            new:true
          })

          if(!updateresult){
            res.status(400).json({
                status:400,
                message:"update is not done"
            })
          }else{
            res.status(200).json({
              status:200,
              message:"update is done",
              date:updateresult
            })
          }
    }catch(err){
       res.status(500).json({
        status:500,
        message:err.message
       })
    }
}

module.exports = {
    register,
    alluser,
    updateuser,
    deleteuser
}
