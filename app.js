const express = require("express");
// const app =require('express')()
const app = express()
const port = 3000;

app.set("view engine", "ejs")

app.listen(port,()=>{
    console.log(`project has started at port ${port}`);
})
app.get('/',(req,res)=>{
    const name = "Aashis Rijal";
    const address = "Nuwakot";
    res.render('home.ejs',{name,address});// address:address
    console.log("all is good")
})
app.get('/about',(req,res)=>{
    res.render('about.ejs');
})
