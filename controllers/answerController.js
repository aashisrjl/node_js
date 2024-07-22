const { where } = require("sequelize");
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
exports.handleDelete = async(req,res)=>{
    try {
        const ansId = req.params.id
    const userId = req.userId
    const data = await answers.destroy({
        where:{
            id: ansId,
            userId
        }
    })

    res.status(200).json({
        message: "answer deleted successfully"
    })
        
    } catch (error) {
        res.status(500).json({
            message: "error:"+ error
            })
    }
    
}
// edit answer page
exports.renderEditPage = async(req,res)=>{
    const userId = req.userId
    const answerId = req.params.id
    console.log(userId,answerId)
    const data = await answers.findAll({
        where: {
            userId,
            id: answerId
            }
        })
        console.log(data)
        
    res.render("question/answerEdit.ejs",{data});
    
}

exports.handleEdit = async(req,res)=>{
    const answerId = req.params.id
    const userId = req.userId
    const {answerText} = req.body
    console.log(req.body)
    await answers.update({
        answerText
        },{
            where: {
                id: answerId,
                userId
                }
                })

                const data = await answers.findAll({
                    where:{
                        id: answerId,
                        userId

                    }
                })
                res.redirect(`/question/${data[0].questionId}`)
                
}
