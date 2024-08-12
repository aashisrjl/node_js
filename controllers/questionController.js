const { QueryTypes } = require("sequelize");
const { questions, users, answers, sequelize } = require("../model")
const {cloudinary} = require('../cloudinary/index')

//get question asking form
exports.renderAskQuestionPage = (req,res)=>{
    const [error] = req.flash("error");
    const [success] = req.flash("success");
    res.render('question/askQuestion.ejs',{error,success})
}

// post question
exports.askQuestion=async (req,res)=>{
    const {title,description} = req.body
    console.log(req.body)
    let fileName;
    let result;
    let file;
    if(req.file){
     fileName = req.file.filename
     result = await cloudinary.v2.uploader.upload(req.file.path)
     file = result.url
    }else{
        fileName = ""
        file = ""
    }
   
    console.log(result)
    const userId = req.userId

    if(!title || !description){
        req.flash("error","Enter all fields")
        res.redirect("/askquestion/");
    }
    await questions.create({
        title,
        image:file,
        description,
        userId
    })
    req.flash("success","Add Question Successfully")
    res.redirect("/")

}


// exports.askAllQuestion = async(req,res)=>{
//     const data = await questions.findAll({
//         include:[
//             {
//             model: users
//             }
//         ]
//     })
// }
// render single page of question
exports.renderQuestionDetailPage = async(req,res)=>{
    const id = req.params.id;
    const data = await questions.findAll({
        where:{
            id:id
        },
        include:[
            {
            model: users,
            attributes:["username"]
            }
        ]
    })
let likes;
let count = 0;
    try {
        likes = await sequelize.query(`SELECT * FROM LIKES_${id}`,{
            type: QueryTypes.SELECT
        })
        if(likes.length > 0){
            count = likes.length
        }
        
    } catch (error) {
        console.log(error)
    }

   const ans = await answers.findAll({
    where:{
        questionId:id
    },include:[
        {
            model:users,
            attributes:["username"]
        }
    ]
   })
   

   // for accessing likes
   const like = await answers.findAll({
    where:{
        questionId:id,
        userId: req.userId
    }
   })

//    const likes = like.likes
//    console.log("likes",likes)
   const [success] = req.flash("success")
   const [error] = req.flash("error")
    res.render('question/questionDetail.ejs',{data,ans,success,error,likes:count});
}