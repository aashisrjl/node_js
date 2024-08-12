const { renderAskQuestionPage, askQuestion, renderQuestionDetailPage, renderQuestionEditPage, handleQuestionDelete, handleEditQuestion } = require('../controllers/questionController')
const { isAuthenticated } = require('../middleware/isAuthenticated')
// setup for file upload in the database
const fs = require('fs');
const {multer,storage}= require('../middleware/multerConfig');
// const upload = multer({storage:storage});
// const multer = require('multer')
// const {storage} = require('../cloudinary/index')
const upload = multer({storage:storage})

const router = require('express').Router()
router.route('/askquestion').get(isAuthenticated,renderAskQuestionPage).post(upload.single('image'),isAuthenticated,askQuestion)
router.route("/question/:id").get(isAuthenticated,renderQuestionDetailPage)
router.route("/question/edit/:id").get(isAuthenticated,renderQuestionEditPage).post(isAuthenticated,upload.single('image'),handleEditQuestion)
router.route("/question/delete/:id").get(isAuthenticated,handleQuestionDelete)




module.exports = router



