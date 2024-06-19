const express = require("express");
const app = express();

const jwt = require("jsonwebtoken")

//require the database table to perform database operation
const { blogs, users } = require("./model/index.js");

// require bcrypt which is used to hashed the password (bcrypt.hashSync(password,10))
const bcrypt = require('bcrypt');

const port = process.env.PORT || 3001;
require("./model/index.js");

// setup for file upload in the database
const fs = require('fs');
const {multer,storage}= require('./middleware/multerConfig.js');
const upload = multer({storage:storage});

// set view engine to the ejs where all the ejs file under views folder have access to the ejs 
app.set("view engine", "ejs");

// print data in console to use req.body 
app.use(express.urlencoded({expanded:true})); // this is for server side rendering 
app.use(express.json());// this is for react next to render api to frontend

//HOME GET
app.get('/',(req,res)=>{

    res.render('home.ejs');// address:address
})

//LOGIN GET
app.get('/login',(req,res)=>{
    res.render('auth/login.ejs');
})

//LOGIN POST
app.post('/login',async(req,res)=>{
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

})

//REGISTER GET
app.get('/register',(req,res)=>{
    res.render('auth/register.ejs');
})

// BLOG GET
app.get('/blog',(req,res)=>{
    res.render('blog.ejs');
})

//REGISTER POST 
app.post('/register', async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.send("please provide valid data");
        }
   await users.create({
        username:username,
        email:email,
        password:bcrypt.hashSync(password,10)
    });
    res.status(200).render("auth/login.ejs");

})

//BLOG POST 
app.post('/blog', upload.single('image'), async(req,res)=>{
const {title,subtitle,description} = req.body;
const fileName = req.file.filename;
await blogs.create({
    img: fileName,
    title,
    subtitle,
    description
})
res.status(201).json({
    msg:"Created Successfully"
});
})

//give access the css folder to the node js 
app.use(express.static('public/css'));

//allocate port number to the server 
app.listen(port,()=>{
    console.log(`project has started at port ${port}`);
})
