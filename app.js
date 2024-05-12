const express = require("express");
// const app =require('express')()
const app = express()
const port = 3000;

app.set("view engine", "ejs")

app.listen(port,()=>{
    console.log(`project has started at port ${port}`);
})
app.get('/',(req,res)=>{
    res.render('home.ejs');
})
app.get('/about',(req,res)=>{
    res.send("This is about page Aashis");
})
