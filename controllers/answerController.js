
const { QueryTypes } = require("sequelize");
const { answers, users, questions,sequelize } = require("../model");

//create answer
exports.handleAnswer= async(req,res)=>{

    try {
        const questionId = req.params.id;
    console.log("questionId:",questionId)
    const {answerText} = req.body
    const userId = req.userId; 
    console.log("userId",userId)
    if(!answerText){
       req.flash("error","Enter a answer text")
       res.redirect(`/question/${questionId}`)
       return
    }
    const data= await answers.create({
        answerText,
        questionId,
        userId
    })
    // query

    await sequelize.query(`CREATE TABLE likes_${data.id} (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
        )`,{
            type: QueryTypes.CREATE
        })

    req.flash("success","Answer Posted Successfully")
    res.redirect(`/question/${questionId}`)
        
    } catch (error) {
        res.status(500).json({
            message: "error:"+ error
        })
    }
    
}

//renderanswerpage
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

//delete asnwer
exports.handleDelete = async(req,res)=>{
    try {
        const ansId = req.params.id
    const userId = req.userId
    const ans = await answers.findOne({
        where:{
            id:ansId
        }
    })
    const data = await questions.findByPk(ans.questionId)
    await answers.destroy({
        where:{
            id: ansId,
            userId
        }
    })
    req.flash("success","Deleted Successfully ")
    res.redirect(`/question/${data.id}`)
        
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

//handle answer edit
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
                req.flash("success","Edited Successfully")
                res.redirect(`/question/${data[0].questionId}`)
                
                
}
