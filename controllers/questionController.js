exports.askQuestion=async (req,res)=>{
    const {title,description} = req.body
    const fileName = req.file.filename
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

exports.askAllQuestion = async(req,res)=>{
    const data = await questions.findAll({
        include:{
            model: users
        }
    })
}