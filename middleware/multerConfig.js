const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
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
        const date = Date.now();
        cb(null,date + "-" + file.originalname);
    }

})

module.exports ={
    multer,
    storage
}

// const multer = require('multer')
// const storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         const acceptFile = ['image/png','image/jpg','image/jpeg']
//         if(!acceptFile.includes(file.mimetype)){
//             cb(new error("only jpeg,png , and jpg file would accept"))
//             return
//         }
//         if(file.size > 1000000){
//             cb(new error("image should be less than 1 mb"))
//             return
//         }
//         cb(null,'./storage')
//     },
//     filename: function (req,file,cb){
//         const date = new Date()
//         const day = date.getSeconds();
//         cb(null,day+file.originalname)
//     }
// })

// module.exports = {
//     multer,
//     storage
// }


