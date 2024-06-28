const { renderLoginPage, renderBlogPage, renderRegisterPage, handleRegister, handleLogin, handleBlog } = require('../controllers/authController')

const router = require('express').Router()

router.route('register').post(handleRegister).post(renderRegisterPage)
router.route('login').post(handleLogin).get(renderLoginPage)
router.route('blog').post(handleBlog).get(renderBlogPage)
module.exports = router