const cartService=require('../services/cart.service');

const {STATUS}=require('../config/constant')

const serverError={
    message:'something went wrong',
    success:false,
    data:{},
    err:'not able to do operation'
}

const addToCart=async(req,res)=>{
    let cart=await cartService.getCartByUser(req.user,STATUS.CREATION)
    if(!cart)
    {
        cart=await cartService.createCart(req.user)
    }
    
    const response=await cartService.addProductToCart(
           req.body.productId,
            cart.id
        )
    if(!response){
        return res.status(500).json(serverError)
    }
    if (response.error){
        return res.status(403).json({
            message:'cannot add product to cart',
            success:false,
            data:{},
            err:response.error
        })
    }
    return res.status(200).json({
        message:'Succussfully added product into cart',
        success:true,
        data:response,
        err:{}
    })
}


const removeProductFromCart=async(req,res)=>{
    const cart=await cartService.getCartByUser(req.user,STATUS.CREATION);
    if(!cart){
        return res.status(400).json({
            message:'No product in the cart',
            data:{},
            success:false,
            err:'Invalid operation on cart'
        })
    }
    const response=await cartService.removeProductFromCart({
        productId:req.body.productId,
        cartId:cart.id
    })
    if (!response){
        return res.status(500).json(serverError)
    }
    if(response.error){
        return res.status(403).json({
            message:'Cannot remove product from cart',
            success:false,
            data:{},
            err:response.error
        })
    }
    return res.status(200).json({
        message:"Successfully removed product from cart",
        success: true,
        err:{},
        data:response
    })
}

const updateOrderStatus=async(req,res)=>{
    const response = await cartService.updateStatus(req.params.id, req.body.status);
    if(!response){
        return res.status(500).json(serverError)
    }
    if(response.error){
        return res.status(403).json({
            message:'Cannot update status',
            success:false,
            data:{},
            err:response.error
        })
    }
    return res.status(200).json({
        message:"Successfully updated the status",
        success:true,
        data:response,
        err:{}
    })
}


const getTotalPrice=async(req,res)=>{
    const response=await cartService.getPriceOfCart(req.params.id)

    if(!response){
        return res.status(500).json(serverError)
    }
    //This bottom if function added by me
    if (response.error){
        return res.status(404).json({
            message:'Invalid Query',
            success:false,
            data:{},
            err:response

        })
    }
    //
    return res.status(200).json({
        message:"Successfully calculated the total",
        success:true,
        data:response,
        err:{}
    })
}


const getUsersOrder=async(req,res)=>{
    const response=await cartService.getOrders(req.user);
    if (!response){
        return res.status(500).json(serverError)
    }
    return res.status(200).json({
        message:'Successfully fetch all the orders',
        data:response,
        success:true,
        err:{}
    })
}

module.exports={
    addToCart,
    removeProductFromCart,
    updateOrderStatus,
    getTotalPrice,
    getUsersOrder
}