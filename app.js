const express = require("express");
// const app =require('express')()
const app = express()
const port = 3001;

app.listen(port,()=>{
    console.log(`project has started at port ${port}`);
})
app.get('/',(req,res)=>{
    res.send("<h1> This is home </h1>");
})
app.get('/about',(req,res)=>{
    res.send("this is about page");
})