const productService=require('../services/product.service');
const _=require('lodash');

const serverError={
    message:'something went wrong',
    success:false,
    data:{},
    err:'Not able to perform the operation on product'
}

const createProduct=async(req,res)=>{
    const response=await productService.create(req.body)
    if (!response)
    {
        return res.status(500).json(serverError)
    }
    return res.status(201).json({
        message:"successfully added the product",
        success:true,
        data:response,
        err:{}
    });
}
const getAllProducts=async(req,res)=>{
    let response;
    if (req.query.name){
        response=await productService.findByName(req.query.name)
        
    }else{
        response=await productService.filterProduct(req.query)
    }
    if(_.isEmpty(response)&&!_.isUndefined(response))
    {
        serverError.err='No product found'
        return res.status(404).json(serverError)
    }    
    if(!response){
        return res.status(500).json(serverError)
    }
    return res.status(200).json({
        message:'successfully fetched the products',
        success:true,
        data:response,
        err:{}
    })
}

const getProductById=async(req,res)=>{
    const response=await productService.findById(req.params.id);
    if (!_.isUndefined(response)&&_.isEmpty(response))
    {
        serverError.err='No product found by the given id'
            return res.status(404).json(serverError)
    }
    if(!response)
    {
        return res.status(500).json(serverError)
    }
    return res.status(200).json({
        message:"successfully fetch the product by id",
        success:true,
        data:response,
        err:{}
    })
}

const updateProduct=async(req,res)=>{
    const response=await productService.update(req.body,req.params.id);
    if(_.isEmpty(response)&&!_.isUndefined(response))
    {
        serverError.err='No product found by given id';
        return res.status(404).json(serverError)
    }
    if (!response){
        return res.status(500).json(serverError)
    }
    return res.status(200).json({
        message:'successfully updated the product',
        success:true,
        data:response,
        err:{}
    })
}

const destroyProduct=async(req,res)=>{
    const response=await productService.destroy(req.params.id)
    if(_.isEmpty(response)&&!_.isUndefined(response))
    {
        console.log(_.isEmpty(response)&&!_.isUndefined(response),'check is empty')
        serverError.err='No product found by given id to delete the product';
        return res.status(404).json(serverError)
    }
    if (!response){
        return res.status(500).json(serverError)
    }
    return res.status(200).json({
        message:'Successfully deleted the product',
        success:true,
        data:{},
        err:{}
    })
}



module.exports={
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    destroyProduct
}