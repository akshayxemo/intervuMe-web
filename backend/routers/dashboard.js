const router = require("express").Router();
const requireLogin = require("../middlewares/requireLogin");
const userDashboardController = require("../controllers/userDashboardController");
router.get("/user/dashboard", requireLogin, userDashboardController.get);
router.get("/mentors", requireLogin, userDashboardController.getMentors);
router.post(
  "/mentor/session",
  requireLogin,
  userDashboardController.getBookedSessions
);
router.post("/session/add", requireLogin, userDashboardController.sessionAdd);
module.exports = router;
