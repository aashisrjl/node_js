const { questions, users, answers } = require("../model")

//get question asking form
exports.renderAskQuestionPage = (req,res)=>{
    res.render('question/askQuestion.ejs')
}

// post question
exports.askQuestion=async (req,res)=>{
    const {title,description} = req.body
    console.log(req.body)
    let fileName;
    if(req.file){
     fileName = req.file.filename
    }else{
        fileName = ""
    }
    console.log(req.file)
    const userId = req.userId

    if(!title || !description){
        return res.send("enter title desc")
    }
    await questions.create({
        title,
        image:fileName,
        description,
        userId
    })
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
    res.render('question/questionDetail.ejs',{data,ans});
}