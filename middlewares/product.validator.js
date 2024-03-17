const _=require('lodash')


const productCreateValidate=(req,res,next)=>{
    if (!req.body.name||!req.body.cost||!req.body.categoryId)
    {
        return res.status(400).json({
            message:'invalid request body',
            success:false,
            data:{},
            err:"Either name, cost or categoryId is missing from the request object"
        })
    }
    next()
}

const productUpdateValidator=(req,res,next)=>{
    if(!req.body.name||!req.body.description||!req.body.cost){
        return res.status(400).json({
            message:"invalid request body",
            success:false,
            data:{},
            err:'either name,des or cost missing from the request object'
        })
    }
    next()
}

const productPatchValidator=(req,res,next)=>{
    if(!(req.body.name||req.body.description||req.body.cost)){
        return res.status(400).json({
            message:"Invalid request body",
            success:false,
            data:{},
            err:"Atleast one parameters among cost, name and description id expected"
        })
    }
    next()
}


module.exports={
    productCreateValidate,
    productUpdateValidator,
    productPatchValidator,
    
}