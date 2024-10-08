const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const dotenv = require('dotenv');
dotenv.config();

const jwt = require("jsonwebtoken")
// accessing database
require("./model/index.js");

const socketio = require('socket.io');
const flash = require('connect-flash')
const session = require("express-session")
app.use(session({
  secret: "aashishrijal",
  resave: false,
  saveUninitialized: false
}))
app.use(flash());

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
     const data = await users.findByPk(decryptedResult.id)
     res.locals.userName = data.username 
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
const { answers, sequelize, Sequelize, users } = require("./model");
const { QueryTypes } = require("sequelize");
app.use("",authRoute)
app.use("",questionRoute)
app.use("",answerRoute)


//give access the css folder to the node js 
app.use(express.static('public/css'));
app.use(express.static('public/img/'));
app.use(express.static('./storage/'));



//allocate port number to the server 
const server = app.listen(port,()=>{
    console.log(`project has started at port ${port}`);
})

const io = socketio(server,{
  cors:{
    origin: "*"
  }
})

io.on('connection',(socket)=>{
  socket.on('like',async({answerId,cookie})=>{
    const answer = await answers.findByPk(answerId);
    if(answer && cookie){
      const decryptedResult = await promisify(jwt.verify)(cookie,"aashish")
  
      if(decryptedResult){
        const user = await sequelize.query(`SELECT * FROM likes_${answerId} WHERE userId=${decryptedResult.id}`,{
          type: QueryTypes.SELECT
        })

        if(user.length === 0){
        await sequelize.query(`INSERT INTO likes_${answerId} (userId) VALUES (${decryptedResult.id})`,{
          type:QueryTypes.INSERT
        })
      }

      }
      const likes = await sequelize.query(`SELECT * FROM likes_${answerId}`,{
        type:QueryTypes.SELECT
      })
      const likesCount  = likes.length 
      await answers.update({
        likes: likesCount
      },{
      where:{
        id:answerId

    }})
      socket.emit('likeUpdate',{likesCount,answerId})
    }
  })
})
