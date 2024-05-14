const express = require("express");
// const app =require('express')()
const app = express()
const port = 3000;

app.set("view engine", "ejs")



app.get('/',(req,res)=>{

    res.render('home.ejs');// address:address

})

app.get('/login',(req,res)=>{
    res.render('auth/login.ejs');
})
app.get('/register',(req,res)=>{
    res.render('auth/register.ejs');
})

app.use(express.static('public/css'));

app.listen(port,()=>{
    console.log(`project has started at port ${port}`);
})
