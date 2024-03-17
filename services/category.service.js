const {category, Product}=require('../models/index')

const create=async(data)=>{
    try{
        const Category= await category.create({
            name:data.name,
            description:data.description
        })
        return Category
    }catch(err){
        console.log('something went wrong');
        console.log(err)
    }
}

const getAll=async()=>{
    try{
        const categories=await category.findAll();
        return categories
        
    }catch(err){
        console.log(err)
        
    }
}

const getById=async(categoryId)=>{
    try{
        const Category=await category.findByPk(categoryId)
        return Category
    }catch(err){
        console.log(err)
    }
}

const getByName=async(categoryName)=>{
    try{
        const Category=await category.findOne({
            where:{
                name:categoryName
            }
        })
       return Category 
    }catch(err){
        console.log(err)
    }
}

const update = async(data,categoryId)=>{
    try{
        const Category=await category.findByPk(categoryId);
        if (!Category){
            console.log('Not able to find the categoryId')
            return {}
        }
        await Category.update(data);
        return Category
    }catch(err){
        console.log(err)
    }
}

const destroy=async(CategoryId)=>{
    try{
        const Category=await category.findByPk(CategoryId)
        await Category.destroy();
        return true;
    }catch(err){
        console.log(err)
    }
}

const getProducts=async(categoryId, query)=>{
    try{
        const Category=await category.findByPk(categoryId, {
            include:{
                model:Product,
                limit:parseInt(query.limit),
                offset:parseInt(query.offset)
                }
        })
        return Category;
    }catch(err){
        console.log(err)
    }
}

module.exports={
    create,
    getAll,
    getById,
    getByName,
    update,
    destroy,
    getProducts
}