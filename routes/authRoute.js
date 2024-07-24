const { renderLoginPage, renderBlogPage, renderRegisterPage, handleRegister, handleLogin, handleBlog, renderHomePage, renderForgotPasswordPage, handleForgotPassword, renderOtpPage, handleVerifyOtp, renderResetPasswordPage, handleResetPassword, handleLogout } = require('../controllers/authController')

const router = require('express').Router()
// setup for file upload in the database
const fs = require('fs');
const {multer,storage}= require('../middleware/multerConfig');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { errorHandler } = require('../services/catchAsyncError');
const upload = multer({storage:storage});

router.route("").get(errorHandler(renderHomePage))
router.route('/register').post(errorHandler(handleRegister)).get(errorHandler(renderRegisterPage))
router.route('/login').post(errorHandler(handleLogin)).get(renderLoginPage)
router.route('/blog').post(upload.single('image'),errorHandler(handleBlog)).get(renderBlogPage)

router.route('/forgotPassword').get(renderForgotPasswordPage).post(handleForgotPassword)
router.route('/verifyOtp').get(renderOtpPage)
router.route('/verifyOtp/:email').post(handleVerifyOtp)

router.route('/resetPassword').get(renderResetPasswordPage)
router.route('/resetPassword/:email/:otp').post(handleResetPassword)

router.route('/logout').get(handleLogout)
module.exports = router