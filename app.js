const express = require("express");
const app = express();

const jwt = require("jsonwebtoken")

//require the database table to perform database operation
const { blogs, users } = require("./model/index.js");

// require bcrypt which is used to hashed the password (bcrypt.hashSync(password,10))
const bcrypt = require('bcrypt');
const cookies = require('cookie-parser')
app.use(cookies())

const port = 3000;
// accessing database
require("./model/index.js");

// setup for file upload in the database
const fs = require('fs');
const {multer,storage}= require('./middleware/multerConfig.js');
const upload = multer({storage:storage});



// react router and controllers
const authRoute = require("./routes/authRoute");
const questionRoute = require("./routes/questionRoute");
const { renderRegisterPage, renderBlogPage, renderLoginPage, handleLogin, handleRegister, handleBlog, renderHomePage } = require("./controllers/authController.js");
const { renderAskQuestionPage, askQuestion } = require("./controllers/questionController.js");
const { isAuthenticated } = require("./middleware/isAuthenticated.js");
app.use("/",authRoute)
app.use("/",questionRoute)

// set view engine to the ejs where all the ejs file under views folder have access to the ejs 
app.set("view engine", "ejs");

// print data in console to use req.body 
app.use(express.urlencoded({expanded:true})); // this is for server side rendering 
app.use(express.json());// this is for react next to render api to frontend

//HOME GET
app.get('/',renderHomePage)

//LOGIN GET
app.get('/login',renderLoginPage)

//LOGIN POST
app.post('/login',handleLogin)

//REGISTER GET
app.get('/register',renderRegisterPage)

// BLOG GET
app.get('/blog',renderBlogPage)

//REGISTER POST 
app.post('/register', handleRegister)

//BLOG POST 
app.post('/blog', upload.single('image'), handleBlog)

// for question and answer portion
app.get('/askquestion',renderAskQuestionPage)
app.post('/askquestion',isAuthenticated,upload.single('image'),askQuestion)

//give access the css folder to the node js 
app.use(express.static('public/css'));

//allocate port number to the server 
app.listen(port,()=>{
    console.log(`project has started at port ${port}`);
})
