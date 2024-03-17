const authService=require('../services/auth.service');
const jwt=require("jsonwebtoken")


const serverError={
    message:'Something went wrong',
    success:false,
    data:{},
    err:'Operation not successful'
}


const authsignup=async(req,res)=>{
    const response=await authService.signup(req.body);
    if (!response){
        return res.status(500).json(serverError)
    }
    if(response.error){
        return res.status(400).json({
            message:response.error,
            success:false,
            data:{},
            err:'Invalid credential'

        })
    }
    return res.status(200).json({
        message:"Successfully Signed up",
        success:true,
        data:response,
        err:{}
    })
}


const signin=async(req,res)=>{
    const user=await authService.getUserByEmail(req.body.email)
    
    if(user==null){
        return res.status(404).json({
            message:'Email not found',
            data:{},
            success:false,
            err:'Invalid credential'
        })
    }
    if(!user){
        return res.status(500).json(serverError)
    }
    if(!authService.checkPassword(req.body.password,user.password))
    {
        console.log("Incorrect password")
        return res.status(400).json({
            message:"Incorrect password",
            success:false,
            data:{},
            err:"Invalid credential"
        })
    }
    const token=authService.createToken({id:user.id,email:user.email})
    if(!token){
        return res.status(500).json(serverError)
    }
    return res.status(200).json({
        message:"successfully logged in",
        success:true,
        data:token,
        err:{}
    })
}


const UpdateUsername=async(req,res)=>{
    const response=await authService.UpdateUsername(req.user,req.body.username)
    if(!response){
        return res.status(500).json(serverError)
    }
    return res.status(200).json({
        message:'Successfully updated the user',
        success:true,
        data:response,
        err:{}
    })
}



module.exports={
    authsignup,
    signin,
    UpdateUsername
}