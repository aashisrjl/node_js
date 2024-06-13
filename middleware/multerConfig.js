const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        console.log(file);
        const allowedFileType = ["image/png","image/jpg","image/jpeg"];
        if(!allowedFileType.includes(file.mimetype)){
            cb(new Error("Only .png, .jpg and .jpeg format allowed!"),false); // if only one parameter then this is for error 
            return
        }
        else if(file.size >= 1000000){
            cb(new Error("File size should be less than 1MB"),false);
            return
        }
        cb(null,'./storage'); // error , success
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }

})

module.exports ={
    multer,
    storage
}

