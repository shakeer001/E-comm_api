const { STATUS } = require('../config/constant');
const {Product, Cart, cart_products}=require('../models/index');
const db=require('../models/index')
const {Op}=require('sequelize');


const getCartByUser=async(uid,cartStatus)=>{
    try {
        const cart=await Cart.findOne({
            where:{
                userId:uid,
                status:cartStatus
            }
        })
        return cart
    } catch (err) {
        console.log(err)
    }
}

const createCart=async(uid)=>{
    try {
        const cart=await Cart.create({userId:uid})
        return cart
    } catch (err) {
        console.log(err)
    }
}

const addProductToCart=async(productid,cartid)=>{
    try {
        const cart = await Cart.findByPk(cartid)
        if(!cart.status=='creation'){
            return{
                error:'Order cannot be modified now'
            }
        }
        console.log(cart.id)
        const product=await Product.findByPk(productid)
        if (!product){
            return{
                error:'No such product found'
            }
        }
        const entry = await cart_products.findOne({
            where:{
                cartId:cart.id,
                productId:product.id
            }
        })
        if (!entry){
            cart.addProduct(product, {
                through:{
                    quentity:1
                }
            })
        }else{
        //     let previousQuantity=entry.quentity;
        //     entry.quentity=previousQuantity+1;
        //     await entry.save()
            entry.increment('quentity',{by:1})
            
        }
        return cart
    } catch (err) {
        console.log(err)
    }
}


const removeProductFromCart=async(data)=>{
    try {
        const cart=await Cart.findByPk(data.cartId)
        if(!cart.status=='creation'){
            return{
                error:'Order cannot be modified now'
            }
        }
        const product=await Product.findByPk(data.productId)
        if(!product){
            return {
                error:'No such product found'
            }
        }
        console.log(cart.id)
        const entry=await cart_products.findOne({
            where:{
                cartid:cart.id,
                productid:product.id
            }
        })
        if(!entry){
            return{
                error:'No such product added in the cart'
            }
        }else{
            await entry.decrement('quentity',{by:1})
            if(entry.quentity==1){
                cart.removeProduct(product);
            }
        }
        return cart
    } catch (err) {
        console.log(err)
    }
}


const updateStatus=async(cartId,cartStatus)=>{
    try {
        const cart=await Cart.findByPk(cartId)
        if (cartStatus==STATUS.CREATION){
            return {
                error:'Cannot edit the order'
            }
        }
        if((cartStatus==STATUS.PLACED&&cart.status==STATUS.CREATION)||
        (cartStatus==STATUS.CANCELLED&&cart.status==STATUS.PLACED)||
        (cartStatus==STATUS.DELIVERED&&cart.status==STATUS.PLACED)){
            cart.status=cartStatus
            await cart.save()
            return cart
        }else{
            return {
                error:'Cannot modify the status'
            }
        }
    } catch (err) {
        console.log(err)
    }
}


const getPriceOfCart=async(cartid)=>{
    try {
        const GET_TOTAL_PRICE_QUERY=`
        SELECT SUM(CP.QUENTITY*P.COST) AS TOTAL_COST 
        FROM Carts AS C INNER JOIN cart_products AS CP
        ON C.ID=CP.CARTID INNER JOIN Products AS P ON CP.PRODUCTID=P.ID
        WHERE C.ID=${cartid}`;
        const [results, metadata] = await db.sequelize.query(GET_TOTAL_PRICE_QUERY);
        const result=results[0]
        if(result.TOTAL_COST==null){
            return {
                error:'No product added in the cart'
            }
        }
        return results
    } catch (err) {
        console.log(err)
    }

}

/**product name
 * product cost
 * quantity
 * status
 */
const getOrders=async(uid)=>{
    try {
       
        const GET_ORDERS_QUERY=`
        SELECT P.name,P.cost,CP.quentity,C.status,C.id FROM Carts as C inner join
        Users as U on U.id=C.userid inner join
        cart_products as CP on C.id=CP.cartid
        inner join Products as P on CP.productid=P.id
        where U.id=${uid} and C.status!='${STATUS.CREATION}'`

        const [orders,metadata]=await db.sequelize.query(GET_ORDERS_QUERY)
        return orders
    } catch (err) {
        console.log(err)
    }
}


module.exports={
    getCartByUser,
    addProductToCart,
    createCart,
    removeProductFromCart,
    updateStatus,
    getPriceOfCart,
    getOrders
}