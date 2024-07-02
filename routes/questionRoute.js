const { renderAskQuestionPage, askQuestion } = require('../controllers/questionController')
const { isAuthenticated } = require('../middleware/isAuthenticated')

const router = require('express').Router()
router.route('askquestion').get(isAuthenticated,renderAskQuestionPage).post(askQuestion)

module.exports = router




