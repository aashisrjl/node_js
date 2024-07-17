const jwt = require('jsonwebtoken')
const {promisify} = require('util');
const { users } = require('../model');


exports.isAuthenticated = async(req,res,next)=>{
    const token = req.cookies.jwtToken;
    if(!token || token === null || token === undefined){
        return res.redirect('/login')
    }
   const decryptedResult = await promisify(jwt.verify)(token,'aashish')
    console.log(decryptedResult)
    const data = await users.findByPk(decryptedResult.id)
    if(!data){
        console.log("not found")
    }
    req.userId = data.id
    next()
    // hello how are you
}