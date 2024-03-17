const express=require('express')
const bodyparser=require('body-parser')
require('dotenv').config()

const categoryRoutes=require('./routes/category.routes')
const productRoutes=require('./routes/product.routes');
const roleRoutes=require('./routes/role.routes');
const cartRoutes=require('./routes/cart.routes');


const authRoutes=require('./routes/auth.routes');

const {syncDb,syncTable} = require("./config/db_sync")

const app=express();

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())


if(process.env.SYNC){
    // syncDb(true)
    syncTable(false,true,require('./models/index').Cart)
    .then(()=>{
        syncTable(false,true,require('./models/index').Product);
    })
    .then(()=>{
        syncTable(false,true,require('./models/index').cart_products)
    })
    
}

PORT=process.env.PORT

categoryRoutes(app)
productRoutes(app)
authRoutes(app)
roleRoutes(app)
cartRoutes(app)

app.set('views','./views')
app.set('view engine','ejs')

app.get('/home',(req,res)=>{
    res.render('home1')
})

app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`)
})
