const categoryService=require('../services/category.service');
const _=require('lodash')
const serverError={
    message:'something went wrong',
    success:false,
    data:{},
    err:'not able to do operation category'
}

const createCategory=async(req,res)=>{
    const response=await categoryService.create(req.body)
    if (!response){
        return res.status(500).json(serverError)
    }
    return res.status(201).json({
        message:'successfully created the category',
        success:true,
        data:response,
        err:{}
    });
}

const getAllCategories=async(req,res)=>{
    let response;
    
    if (req.query.name)
    {
        response=await categoryService.getByName(req.query.name)
        
    }else{
       response=await categoryService.getAll();
    }
    if (!response){
        return res.status(500).json({
            message:'Not albe to find the categories',
            success:true,
            data:{},
            err:'category not present'
        })
    }

    return res.status(200).json({
        message:'successfully fetched all the categories',
        success:true,
        data:response,
        err:{}
    })
}

const getCategoryById=async(req,res)=>{
    const response=await categoryService.getById(req.params.id)
    if(!response)
    {
        return res.status(500).json(serverError)
    }
    return res.status(200).json({
        message:'successfully fetched the category',
        success:true,
        data:response,
        err:{}
    })
}

const updateCategory=async(req,res)=>{
    const response=await categoryService.update(req.body,req.params.id)
    if (_.isEmpty(response)&&!_.isUndefined(response)){
        // serverError.message='Not able to find the category';
        return res.status(400).json({
            message:'Not able to find the category',
            success:false,
            data:{},
            err:'not able to do operation category'
        })
    }
    if (!response){
        return res.status(500).json(serverError)
    }
    return res.status(200).json({
        message:'successfully updated the category',
        success:true,
        data:response,
        err:{}
    })
}

const DeleteCategory=async(req,res)=>{
    const response=await categoryService.destroy(req.params.id);
    if (!response){
        return res.status(500).json(serverError)
    }
    return res.status(200).json({
        message:'Successfully deleted the category',
        success:true,
        data:{},
        err:{}
    })
}

const getProductsByCategory=async(req,res)=>{
    const response=await categoryService.getProducts(req.params.id,req.query);

    if (!response){
        return res.status(500).json(serverError)

    }
    return res.status(200).json({
        message:'Successfully fetched the products of the category',
        success:true,
        data:response,
        err:{}
    });
}

module.exports={
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    DeleteCategory,
    getProductsByCategory
}