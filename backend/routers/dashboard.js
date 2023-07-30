const router = require("express").Router();
const requireLogin = require("../middlewares/requireLogin");
const requireMentorLogin = require("../middlewares/requireMentorLogin");
const userDashboardController = require("../controllers/userDashboardController");
const mentorDashboardController = require("../controllers/mentorDashboardController");
router.get("/user/dashboard", requireLogin, userDashboardController.get);
router.get("/mentors", requireLogin, userDashboardController.getMentors);
router.post(
  "/mentor/session",
  requireLogin,
  userDashboardController.getBookedSessions
);
router.post("/session/add", requireLogin, userDashboardController.sessionAdd);

router.get(
  "/mentor/dashboard",
  requireMentorLogin,
  mentorDashboardController.get
);

router.post("/user-details", userDashboardController.getUserDetails);
router.post(
  "/generate-result",
  requireMentorLogin,
  mentorDashboardController.generateResult
);

module.exports = router;
