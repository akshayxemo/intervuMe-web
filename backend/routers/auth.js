const loginController = require("../controllers/loginController");
const signupController = require("../controllers/signupController");
const forgetPasswordController = require("../controllers/forgetPasswordController");
const resetPasswordController = require("../controllers/resetPasswordController");
const mentorAuthController = require("../controllers/mentorAuthController");
const adminController = require("../controllers/adminController");
const router = require("express").Router();

router.post("/login", loginController.post);
router.post("/mentor/login", mentorAuthController.login);
router.post("/signup", signupController.post);
router.post("/mentor/signup", mentorAuthController.signup);

router.post("/forget-password", forgetPasswordController.post);
router.get("/reset-password/:id/:token", resetPasswordController.get);
router.post("/reset-password/:id/:token", resetPasswordController.post);

router.post("/admin/login", adminController.login);
router.post("/admin/signup", adminController.signup);

module.exports = router;
