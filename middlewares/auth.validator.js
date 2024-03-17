const authServices=require("../services/auth.service")
const roleServices=require('../services/role.service')


const validateSignup=(req,res,next)=>{
    if(!req.body.email||!req.body.password){
        return res.status(400).json({
            message:"Invalid arguments",
            success:false,
            data:{},
            err:'Email or Password is missing'
        })
    }
    next()
}

const validateSignin=async(req,res,next)=>{
    if(!req.body.email||!req.body.password){
        return res.status(400).json({
            message:"Invalid arrguments",
            success:false,
            err:"Email or Password missing",
            data:{}
        })
    }
 next()
}

const isAuthenticated=async(req,res,next)=>{
    const token=req.header("x-access-token");
    if(!token){
        return res.status(401).json({
            message:"JWT token missing",
            success:false,
            data:{},
            err:'Invalid or missing token'
        })
    }

    const response=authServices.verifyToken(token)
    if (!response) {
        return res.status(401).json({
            message:"JWT not verified",
            success:false,
            data:{},
            err:"Invalid authenticated details"
        })
    }

    const user=await authServices.getUserById(response.id)
    if (!user){
        return res.status(401).json({
            message:'JWT for an Invalid user sent',
            success:false,
            data:{},
            err:"Invalid credentials"
        })
    }
    req.user=user.id
    next()
}


const checkAdmin=async(req,res,next)=> {
    const user=await authServices.getUserById(req.user)
    const role=await roleServices.getRoleById(1)
    const isAdmin=await user.hasRole(role)
    if(!isAdmin)
    {
        return res.status(401).json({
            message:"User not an admin",
            err:"Not authorized",
            data:{},
            success:false
        })
    }
    next()
}


const isAdminOrSeller= async (req,res,next)=>{
    const user=await authServices.getUserById(req.user)
    const admin=await roleServices.getRoleById(1)
    const seller=await roleServices.getRoleById(2)
    if(!await user.hasRole(admin)&&!await user.hasRole(seller)){
        return res.status(401).json({
            message:'Action only available to a valid admin or seller',
            success:false,
            err:'not authorized',
            data:{}
        })
    
    }
    next()
}

const isSameUserloggedin=async(req,res,next)=>{
    if (req.user!=req.body.userid){
        return res.status(401).json({
            message:'Cannot change username of other user',
            err:'Not authorized',
            data:{},
            success:false
        })
    }
    next()
}

module.exports={
    validateSignup,
    validateSignin,
    isAuthenticated,
    checkAdmin,
    isAdminOrSeller,
    isSameUserloggedin

}