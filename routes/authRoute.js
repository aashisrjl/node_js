const { renderLoginPage, renderBlogPage, renderRegisterPage, handleRegister, handleLogin, handleBlog, renderHomePage, renderForgotPasswordPage, handleForgotPassword, renderOtpPage } = require('../controllers/authController')

const router = require('express').Router()
// setup for file upload in the database
const fs = require('fs');
const {multer,storage}= require('../middleware/multerConfig');
const upload = multer({storage:storage});

router.route("").get(renderHomePage)
router.route('/register').post(handleRegister).get(renderRegisterPage)
router.route('/login').post(handleLogin).get(renderLoginPage)
router.route('/blog').post(upload.single('image'),handleBlog).get(renderBlogPage)

router.route('/forgotPassword').get(renderForgotPasswordPage).post(handleForgotPassword)
router.route('/otpPage').get(renderOtpPage).post()

router.route('/logout').get(renderLoginPage)
module.exports = router