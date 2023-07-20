const router = require("express").Router();
const requireLogin = require("../middlewares/requireLogin");
const dashboardBodyController = require("../controllers/dashboardBodyController");
router.get("/user/dashboard", requireLogin, dashboardBodyController.get);

module.exports = router;
