const { answers, users } = require("../model");


exports.handleAnswer= async(req,res)=>{

    try {
        const questionId = req.params.id;
    console.log("questionId:",questionId)
    const {answerText} = req.body
    const userId = req.userId; 
    console.log("userId",userId)
    if(!answerText){
        res.status(400).json({
            message: "please enter answer"
        })
        return
    }
    const answer = await answers.create({
        answerText,
        questionId,
        userId
    })
    res.redirect(`/question/${questionId}`)
    // res.status(201).json({
    //     message: "answer created successfully",
    //     })
        
    } catch (error) {
        res.status(500).json({
            message: "error:"+ error
        })
    }
    
}
exports.renderAnswerPage = async(req,res)=>{
    const userId= req.userId
    const id = req.params.id
    const data = await answers.findAll({
        where:{
            userId,
            id
        },
        include:[
            {
            model: users,
            attributes:["username"]
            }
        ]
    })
    res.render('component/answer.ejs',{data});
}