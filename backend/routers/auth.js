const loginController = require('../controllers/loginController')
const signupController = require('../controllers/signupController')
const forgetPasswordController = require('../controllers/forgetPasswordController')
const resetPasswordController = require('../controllers/resetPasswordController')
const router = require('express').Router()

router.post("/login", loginController.post)
router.post("/signup", signupController.post)

router.post("/forget-password", forgetPasswordController.post)
router.get("/reset-password/:id/:token", resetPasswordController.get)
router.post("/reset-password/:id/:token", resetPasswordController.post)

module.exports = router