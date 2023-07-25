const router = require("express").Router();
const requireLogin = require("../middlewares/requireLogin");
const userDashboardController = require("../controllers/userDashboardController");
router.get("/user/dashboard", requireLogin, userDashboardController.get);
router.post("/session/add", requireLogin, userDashboardController.sessionAdd);
router.get("/mentors", requireLogin, userDashboardController.getMentors);

module.exports = router;
