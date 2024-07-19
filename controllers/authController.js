const { users, blogs, questions } = require("../model");
// require bcrypt which is used to hashed the password (bcrypt.hashSync(password,10))
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const sendEmail = require("../util/sendEmail");

// setup for file upload in the database
// const fs = require('fs');
// const {multer,storage}= require('../middleware/multerConfig.js');
// const upload = multer({storage:storage});

//home
exports.renderHomePage = async(req,res)=>{
    const data = await questions.findAll(
        {
        include:[{
            model: users,
            attributes: ["username"] // this defines the credential to pass the data to the frontend
        }]
     }
    )// return array because it fins all 
    res.render("home.ejs",{data:data});
}

//login 
exports.renderLoginPage = (req,res)=>{
    res.render("auth/login.ejs");
}

//register 
exports.renderRegisterPage = (req,res)=>{
    res.render('auth/Register.ejs');
}
//blog
exports.renderBlogPage = (req,res)=>{
    res.render('blog.ejs');
}
// handle login
exports.handleLogin = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.send("please provide valid email and password");
    }
    // check email
    const [data] = await users.findAll({
        where:{
            email:email
        }
    })
    if(data){
        // check password
       const isMatch = await bcrypt.compare(password,data.password);
        if(isMatch){
          const token =  jwt.sign({id:data.id},'aashish',{
                expiresIn: "30d"
            })
            res.cookie("jwtToken",token)
            res.render("blog.ejs");
            }else{
                res.send("password is incorrect");
                }
    }else{ 
        res.send("email not found");

    }

}
//handle Register
exports.handleRegister = async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.send("please provide valid data");
        }

   await users.create({
        username:username,
        email:email,
        password:bcrypt.hashSync(password,10)
    });
    sendEmail({
        email,
        subject: "Registered Successfully",
        text: `Dear ${username}
        You are registered to the nasaHacking Community`
    })
    res.status(200).render("auth/login.ejs");

}

//handle blog
exports.handleBlog = async(req,res)=>{
    const {title,subtitle,description} = req.body;
    const fileName = req.file.filename;
    console.log(req.file)
    await blogs.create({
        img: fileName,
        title,
        subtitle,
        description
    })
    res.status(201).json({
        msg:"Created Successfully"
    });
    }

    exports.renderForgotPasswordPage = async(req,res)=>{
        res.render("./auth/forgotPassword.ejs");
    } 

    exports.handleForgotPassword = async(req,res)=>{
        const {email} = req.body;
        const data = await users.findAll({
            where:{
                email
            }
        })
        if(!data.length ===0){
            return res.send("No user found with this email")
        }
        const otp = Math.floor(Math.random()*1000)+9999;
        res.locals.otp = otp
        //send that otp to above email
        sendEmail(
            {
                email,
                subject:"Verification OTP code",
                text: `your otp is : ${otp}`
            }
        )
        data[0].otp = otp
        await data[0].save();
        res.redirect("/verifyOtp/");
    } 

    exports.renderOtpPage = (req,res)=>{
        res.render('./auth/verifyOtp.ejs');
    }

    exports.handleVerifyOtp = async(req,res)=>{
        // const userId = req.userId
        const {otp} = req.body
        const data = await users.findAll({
            where:{
                otp
            }
        })
        if(!data.length ===0){
            return res.send("No user found with this otp")
            }
            res.redirect(`/resetPassword/${otp}`);
    }
    exports.renderResetPasswordPage = (req,res)=>{
        res.render('./auth/resetPassword.ejs');
    }
    exports.handleResetPassword = async(req,res)=>{
        const otp= req.params.id
        const {password,confirmPassword} = req.body
        if(!password || !confirmPassword){
            return res.send("Please enter password and confirm password")
        }
        if(password != confirmPassword){
            return res.send("Password and confirm password does not match")
        }
        const data = await users.update({
            password,
            where:{
                otp
                }
                })
                if(!data.length ===0){
                    return res.send("No user found with this otp")
                    }

    }