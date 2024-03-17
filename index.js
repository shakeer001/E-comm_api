const jwt=require('jsonwebtoken');

const token=jwt.sign({id:1,email:'shakeer@ad.com'}, 'relevel',{
    expiresIn:'2 days'
})
console.log(token)

let response=jwt.verify(token,"relevel");
console.log(response)