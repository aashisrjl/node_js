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
            res.redirect("/");
            }else{
                res.send("password is incorrect");
                }
    }else{ 
        res.send("email not found");

    }

}
//handle logout
exports.handleLogout = (req,res)=>{
    res.clearCookie("jwtToken");
    res.redirect("/login");
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
        you are new member of the project`
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
        
        if(data[0].email != email){
            return res.send("please provide valid data");
        }
        
        
        //otp mathi assign garya xu
        const otp = Math.floor(Math.random()*1000)+9999;
        // res.locals.otp = otp
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

         // set time for otp
        
         setTimeout(async ()=>{
            data[0].otp = null
        await data[0].save();
        },1000*60)
    
        res.redirect("/verifyOtp/"+email);
    } 

    exports.renderOtpPage = (req,res)=>{
        const email = req.query.email
        res.render('./auth/verifyOtp.ejs',{email:email});
    }

    exports.handleVerifyOtp = async(req,res)=>{
        // const userId = req.userId
        const {user_otp} = req.body
        const {email} = req.query
        const data = await users.findAll({
            where:{
                otp: user_otp,
                email
            }
        })
        if(data.length ===0){
            return res.send("No user found with this otp")
            }
            res.redirect(`/resetPassword/${user_otp}`);
    }
    exports.renderResetPasswordPage = (req,res)=>{
        const user_otp = req.params.id
        res.render('./auth/resetPassword.ejs',{user_otp});
    }
    exports.handleResetPassword = async(req,res)=>{
        const user_otp= req.params.id
        console.log(user_otp)
        const {password,confirmPassword} = req.body
        if(!password || !confirmPassword){
            return res.send("Please enter password and confirm password")
        }
        if(password != confirmPassword){
            return res.send("Password and confirm password does not match")
        }
        
        const data = await users.findAll({
            where:{
                otp: user_otp
                
            }
        })
        data[0].password = bcrypt.hashSync(password,10)
        await data[0].save();
        res.redirect("/login");
                if(data.length ===0){
                    return res.send("No user found with this otp")
                    }

    }