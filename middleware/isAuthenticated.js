const jwt = require('jsonwebtoken')
const {promisify} = require('util');
const { users } = require('../model');


exports.isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.cookies.jwtToken;
    if(!token || token === null || token === undefined){
        return res.redirect('/login')
    }
   const decryptedResult = await promisify(jwt.verify)(token,'aashish')
    console.log(decryptedResult)
    const data = await users.findByPk(decryptedResult.id)
    if(!data){
        console.log("not found")
        res.redirect("/login")
    }
    req.userId = data.id
    req.userName = data.username
    next()
    } catch (error) {
        console.log(error)
    }
}