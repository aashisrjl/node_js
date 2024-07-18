const nodemailer = require('nodemailer')
const sendEmail = async(data)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: "ashisrijal252@gmail.com",
            pass: "apppassword"
        }
    })
    const mailOption={
        from : "Nodejs project by @aashis",
        to: data.email,
        subject: data.subject,
        text: data.text
    }
    await transporter.sendMail(mailOption)
}
module.exports= sendEmail;