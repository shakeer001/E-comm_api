const {User, Role}=require('../models/index');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const signup=async(data)=>{
    try{
        const user=await User.create(data)
        const role=await Role.findOne({
            where:{
                name: "CUSTOMER"
            }
        })
        user.addRole(role)
        return user
    }catch(err){
        console.log(err)
        if (err.name=="SequelizeValidationError"){
            return{
                error:err.message
            }
        }
        else if(err.name=='SequelizeUniqueConstraintError'){
               return{
                error:'Email is already used'
               } 
            }
        }
        // return undefined
    
}

const getUserByEmail=async(userEmail)=>{
    try {
        const users=await User.findOne({
            where:{
                email:userEmail
            }
        });
        return users
    } catch (err) {
        console.log(err)
    }
}

const getUserById=async(id)=>{
    try{
        const user=await User.findByPk(id)
        return user
    }catch(err){
        console.log(err)
    }
}

const createToken=(user)=>{
    try {
        return jwt.sign(user,process.env.JWT_SECRET)
    } catch (err) {
        console.log(err)
    }
}

const checkPassword=(userPassword,encryptedPass)=>{
   try{
        return bcrypt.compareSync(userPassword,encryptedPass)
   }catch(err){
    console.log(err)
   } 
}

const verifyToken=(token)=>
{
    try {
        const response=jwt.verify(token,process.env.JWT_SECRET)
        return response
    } catch (err) {
        console.log(err)
    }
}

const UpdateUsername=async(id,name)=>{
    try {
        const user=await User.findByPk(id)
        user.username=name;
        await user.save()
        return user;
    } catch (err) {
        console.log(err)
        
    }
}


module.exports={
    signup,
    getUserByEmail,
    checkPassword,
    createToken,
    verifyToken,
    getUserById,
    UpdateUsername
}