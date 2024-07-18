const { answers } = require("../model");


exports.handleAnswer= (req,res)=>{
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
    const answer = answers.create({
        answerText,
        questionId,
        userId
    })
    res.status(201).json({
        message: "answer created successfully",
        })
    
}