const authController=require('../controllers/auth.controller');
const authValidator=require("../middlewares/auth.validator")
const routes=(app)=>{
    app.post(
        '/ecom/api/v1/signup',
        authValidator.validateSignup,
        authController.authsignup
    ),

    app.get(
        '/ecom/api/v1/signin',
        authValidator.validateSignin,
        authController.signin
    )

    app.patch(
        '/ecom/api/v1/user',
        authValidator.isAuthenticated,
        // authValidator.isSameUserloggedin,
        authController.UpdateUsername
    )
}

module.exports=routes
