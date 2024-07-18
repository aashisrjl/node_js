const { isAuthenticated } = require('../middleware/isAuthenticated')
// setup for file upload in the database
const fs = require('fs');
const {multer,storage}= require('../middleware/multerConfig');
const { handleAnswer } = require('../controllers/answerController');
const upload = multer({storage:storage});

const router = require('express').Router()
router.route("/answer/:id").post(isAuthenticated,handleAnswer).get()

module.exports = router