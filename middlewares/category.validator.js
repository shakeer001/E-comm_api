const validateCreate=(req,res,next)=>{
    if (!req.body.name)
    {
        return res.status(400).json({
            message:'category name is missing, please try again by adding a category name',
            success:false,
            err:'Parameters missing from the request body',
            data:{}
        })
    } 
    next()
}

const validateGetById=(req,res,next)=>{
    if (Number.isNaN(parseInt(req.params.id)))
    {
        return res.status(400).json({
            message:'Invalid request params',
            success:false,
            data:{},
            err:'Expected a valid integer id for the category'
        })
    }
    next()
}

const validateUpdate=(req,res,next)=>{
    if (!req.body.name || !req.body.description)
    {
        return res.status(400).json({
            message:'Invalid request params',
            success:false,
            data:{},
            err:'Missing name or description'
        })
    }
    next()
}

const validatePartialUpdate=(req,res,next)=>{
    if(!req.body.name && !req.body.description){
        return res.status(400).json({
            message:'Invalid request params',
            success:false,
            data:{},
            err:'Missing name and description'
        })
    }
    next()
}

const validatedelete=(req,res,next)=>{
    if(Number.isNaN(parseInt(req.params.id))){
        return res.status(400).json({
            message:'Invalid request params',
            success:false,
            data:{},
            err:'Expected a valid integer id for the category'
        })
    }
    next()
}

const validatePaginator=(req,res,next)=>{
    if (!(req.query.limit||res.query.offset)){
        next()
    }
    const invalidQueryObject={
        message:'invalid query arguments',
        success:false,
        data:{},
        err:'limit or offset should be valid numbers'
    }
    if (req.query.limit&&Number.isNaN(parseInt(req.query.limit)))
    {
        return res.status(400).json(invalidQueryObject)
    }
    if (req.query.offset&&Number.isNaN(parseInt(req.query.offset)))
    {
        return res.status(400).json(invalidQueryObject)
    }
    next()
}

module.exports={
    validateCreate,
    validateGetById,
    validateUpdate,
    validatePartialUpdate,
    validatedelete,
    validatePaginator
}