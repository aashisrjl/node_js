const { questions, users } = require("../model")


exports.renderAskQuestionPage = (req,res)=>{
    res.render('question/askQuestion.ejs')
}

exports.askQuestion=async (req,res)=>{
    const {title,description} = req.body
    console.log(req.body)
    const fileName = req.file.filename
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
    console.log(data)
    res.render('question/questionDetail.ejs',{data});
}