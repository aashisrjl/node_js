const { isAuthenticated } = require('../middleware/isAuthenticated')
// setup for file upload in the database
const fs = require('fs');
const {multer,storage}= require('../middleware/multerConfig');
const { handleAnswer, renderAnswerPage, handleDelete, renderEditPage, handleEdit } = require('../controllers/answerController');
const { errorHandler } = require('../services/catchAsyncError');
const upload = multer({storage:storage});

const router = require('express').Router()
router.route("/answer/:id").post(isAuthenticated,errorHandler(handleAnswer)).get()
router.route("/deleteAnswer/:id").get(isAuthenticated,errorHandler(handleDelete))
router.route("/answerEdit/:id").get(isAuthenticated,errorHandler(renderEditPage)).post(isAuthenticated,errorHandler(handleEdit))

module.exports = router