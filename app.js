const express = require("express");
const app = express();
const port = 3000;

const dotenv = require('dotenv');
dotenv.config();

const jwt = require("jsonwebtoken")
// accessing database
require("./model/index.js");

//require the database table to perform database operation
// const { blogs, users } = require("./model/index.js");

// require bcrypt which is used to hashed the password (bcrypt.hashSync(password,10))
const bcrypt = require('bcrypt');
const cookies = require('cookie-parser');
const { promisify } = require("util");
app.use(cookies())
// print data in console to use req.body 
// Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data (for API requests)
app.use(express.json());

// set view engine to the ejs where all the ejs file under views folder have access to the ejs 
app.set("view engine", "ejs");


// accessing database
require("./model/index.js");

// setup for file upload in the database
// const fs = require('fs');
// const {multer,storage}= require('./middleware/multerConfig.js');
// const upload = multer({storage:storage});
// for dynamic navbar
app.use(async (req,res,next)=>{
    const token =  req.cookies.jwtToken 
   try {
     const decryptedResult =  await promisify(jwt.verify)(token,'aashish')
     if(decryptedResult){
         res.locals.isAuthenticated = true 
     }else{
          res.locals.isAuthenticated = false 
     }
   } catch (error) {
     res.locals.isAuthenticated = false 
   }
    next()
 })


// react router and controllers
const authRoute = require("./routes/authRoute");
const questionRoute = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");
app.use("",authRoute)
app.use("",questionRoute)
app.use("",answerRoute)

// //HOME GET
// app.get('/',renderHomePage)

// //LOGIN GET
// app.get('/login',renderLoginPage)

// //LOGIN POST
// app.post('/login',handleLogin)

// //REGISTER GET
// app.get('/register',renderRegisterPage)

// // BLOG GET
// app.get('/blog',renderBlogPage)

// //REGISTER POST 
// app.post('/register', handleRegister)

// //BLOG POST 
// app.post('/blog', upload.single('image'), handleBlog)

// for question and answer portion
// app.get('/askquestion',renderAskQuestionPage)
// app.post('/askquestion',isAuthenticated,upload.single('image'),askQuestion)


// app.get('/question/:id',renderQuestionDetailPage)

//give access the css folder to the node js 
app.use(express.static('public/css'));
app.use(express.static('./storage/'));



//allocate port number to the server 
app.listen(port,()=>{
    console.log(`project has started at port ${port}`);
})
