const { renderAskQuestionPage, askQuestion, renderQuestionDetailPage } = require('../controllers/questionController')
const { isAuthenticated } = require('../middleware/isAuthenticated')
// setup for file upload in the database
const fs = require('fs');
const {multer,storage}= require('../middleware/multerConfig');
const upload = multer({storage:storage});

const router = require('express').Router()
router.route('/askquestion').get(isAuthenticated,renderAskQuestionPage).post(upload.single('image'),isAuthenticated,askQuestion)
router.route("/question/:id").get(renderQuestionDetailPage)

module.exports = router




