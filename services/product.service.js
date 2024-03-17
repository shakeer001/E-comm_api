const {Product, category}=require('../models/index')
const {Op}=require('sequelize')

const create=async(data)=>{
    try{
        const product=await Product.create(data);
        return product
    }catch(err){
        console.log(err)
    }
}

const getAll=async()=>{
    try{
        const products=await Product.findAll({include:category})
        return products
    }catch(err){
        console.log(err);
    }
}

const findByName=async(name)=>{
    try{
        const product=await Product.findAll({
            where:{
                name:{
                    [Op.like]:`${name}%`
                }
            },
            include:category
        })
        return product
    }catch(err){
        console.log(err)
    }
}

const findById=async(productId)=>{
    try{
        const product=await Product.findByPk(productId)
        return product
    }catch(err){
        console.log(err)
    }
}

const update=async(data,productId)=>{
    try{
        const product=await Product.findByPk(productId)
        if (!product){
            console.log('Not able to find the product')
            return {};
        }
        await product.update(data);
        return product;
    }catch (err){
        console.log(err)
    }
}

const destroy=async(productId)=>{
    try{
        const product = await Product.findByPk(productId)
        if (!product){
            console.log('Not able to find the product')
            return {};
        }
        await product.destroy()
        return product;
    }catch(err){
        console.log(err)

        
    }
}

// const filter=async(data)=>{
    
//         if(!data.minPrice && !data.maxPrice && !data.categoryid){
//             const product=await Product.findAll()
            
//             return product
            
//         }
//         else if (!data.categoryid && !data.maxPrice){
//             const product = await Product.findAll({
//             where:{
//                 cost:{
//                     [Op.gte]:data.minPrice
//                 }
//             }   
//         })
   
//         return product
//         }else if(!data.maxPrice&&data.minPrice){
//             const product = await Product.findAll({
//             where:{
//                 cost:{
//                     [Op.gte]:data.minPrice
//                 },
//                 categoryid:data.categoryid
//             }
            
//         })
     
//         return product
//         }else if (!data.categoryid && !data.minPrice){
//             const product = await Product.findAll({
//             where:{
//                 cost:{
//                     [Op.lte]:data.maxPrice
//                 }
//             }   
//         })

//         return product
//     }else if (!data.minPrice&&data.maxPrice){
//             const product = await Product.findAll({
//             where:{
//                 cost:{
//                     [Op.lte]:data.maxPrice
//                 },
//                 categoryid:data.categoryid
//             }   
//         })
    
//         return product
//     }else if(!data.categoryid){
        
//             const product = await Product.findAll({
//             where:{
//                 cost:{
//                     [Op.gte]:data.minPrice,
//                     [Op.lte]:data.maxPrice
//                 }
//             }   
//         })
     
//         return product
//     }else if(!data.maxPrice&&!data.minPrice){
//         const product = await Product.findAll({
//             where:{
//                 categoryid:data.categoryid
//             }   
//         })
  
//         return product
//     }else{
//         const product = await Product.findAll({
//             where:{
//                 cost:{
//                     [Op.gte]:data.minPrice,
//                     [Op.lte]:data.maxPrice
//                 },
//                 categoryid:data.categoryid
//             }   
//         })
//         return product
//     }
// }

const createfilter=(data)=>{
    let filter={};
    if (data.minPrice&&data.maxPrice){
        Object.assign(filter,{[Op.lte]:data.maxPrice});
        Object.assign(filter,{[Op.gte]:data.minPrice})
    }else if(data.minPrice){
        Object.assign(filter,{[Op.gte]:data.minPrice})
    }else if(data.maxPrice){
        Object.assign(filter,{[Op.lte]:data.maxPrice});
    }
    return filter;
}

const filterProduct=async(data)=>{
    let products;
    if (!data.categoryid && !data.minPrice && !data.maxPrice)
    {
        products=await Product.findAll();
        return products
    }
    filter=createfilter(data)
    if (!data.categoryid)
    {
        products=await Product.findAll({
            where:{
                cost:filter
            }
        })
        return products
    }
    let costAndCategoryFilter;
    if (data.minPrice||data.maxPrice)
    {
        costAndCategoryFilter={
            cost:filter,
            categoryid:data.categoryid
        }
    }else{
        costAndCategoryFilter={
            categoryid:data.categoryid
        }
    }
    products=await Product.findAll({
        where:costAndCategoryFilter
    })
    return products
}

module.exports={
    create,
    getAll,
    findByName,
    findById,
    update,
    destroy,
    filterProduct
}