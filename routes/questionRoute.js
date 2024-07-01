const { renderAskQuestionPage, askQuestion } = require('../controllers/questionController')

const router = require('express').Router()
router.route('askquestion').get(renderAskQuestionPage).post(askQuestion)

module.exports = router




