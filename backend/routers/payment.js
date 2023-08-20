const router = require("express").Router();
const subscriptionController = require("../controllers/subscriptionController");
const requireLogin = require("../middlewares/requireLogin");

router.post("/subscription", requireLogin, subscriptionController.subscribe);
router.get("/plans", requireLogin, subscriptionController.getPlans);
router.post(
  "/confirm-subscription",
  requireLogin,
  subscriptionController.updateUserSubscription
);
module.exports = router;
