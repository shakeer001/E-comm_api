const roleService=require('../services/role.service')


const serverError={
    message:"Something went wrong",
    data:{},
    success:false,
    err:'Not able to do the operation'
}

const addRoleToUser=async(req,res)=>{
    const response=await roleService.addRole(req.body.roleId, req.body.userId)
    if(!response){
        return res.status(500).json(serverError)

    }
    return res.status(200).json({
        message:'Successfully added role to the user',
        success:true,
        data:response,
        err:{}
    })
}


const removeRoleFromUser=async(req,res)=>{
    const response=await roleService.removeRole(req.body.roleId, req.body.userId)
    if(!response){
        return res.status(500).json(serverError)

    }
    return res.status(200).json({
        message:'Successfully revoked role from the user',
        success:true,
        data:response,
        err:{}
    })
}


module.exports={
    addRoleToUser,
    removeRoleFromUser
}