const express = require("express");
const app = express()
const { blogs, users } = require("./model/index.js");
// const app =require('express')()
const port = 3000;
require("./model/index.js");

app.set("view engine", "ejs");
// print data in console to use req.body 
app.use(express.urlencoded({expanded:true})); // this is for server side rendering 
app.use(express.json());// this is for react next to render api to frontend

app.get('/',(req,res)=>{

    res.render('home.ejs');// address:address
})

app.get('/login',(req,res)=>{
    res.render('auth/login.ejs');
})

app.get('/register',(req,res)=>{
    res.render('auth/register.ejs');
})
app.get('/blog',(req,res)=>{
    res.render('blog.ejs');
})

app.post('/register', async(req,res)=>{
    const {username,email,password} = req.body;
    console.log(req.body);
    await users.create({
        username:username,
        email:email,
        password:password
    });
    res.send('Registered successfully');

})
// app.get('/login', async(req,res)=>{
//     const data = await users.findAll();
//     res.json({
//         data
//     })
// })

app.post('/blog', async(req,res)=>{
const {title,subtitle,description} = req.body;
console.log(req.body);
await blogs.create({
    title,
    subtitle,
    description
})
res.send("Created succesfully");
})
app.use(express.static('public/css'));

app.listen(port,()=>{
    console.log(`project has started at port ${port}`);
})
