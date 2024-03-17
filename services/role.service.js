const {Role, User}=require('../models/index')

const addRole=async(roleId, userId)=>{
    try{
        const user=await User.findByPk(userId);
        const role=await Role.findByPk(roleId);
        user.addRole(role)
        return true
    }catch (err){
        console.log(err)
    }
}


const removeRole=async(roleId, userId)=>{
    try{
        const user=await User.findByPk(userId);
        const role=await Role.findByPk(roleId);
        user.removeRole(role)
        return true
    }catch (err){
        console.log(err)
    }
}

const getRoleById=async(roleId)=>{
    try {
        const role =await Role.findByPk(roleId);
        return role;
    } catch (err) {
        console.log(err)
    }
}

module.exports={
    addRole,
    removeRole,
    getRoleById
}