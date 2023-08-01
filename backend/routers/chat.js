const router = require("express").Router();
const requireLogin = require("../middlewares/requireLogin");
const requireMentorLogin = require("../middlewares/requireMentorLogin");
const chatController = require("../controllers/chatController");

router.post(
  "/mentor/send-chat",
  requireMentorLogin,
  chatController.mentorSendChat
);

router.post("/user/send-chat", requireLogin, chatController.userSendChat);

router.get(
  "/mentor/get-chats/:id",
  requireMentorLogin,
  chatController.GetChats
);

router.get("/user/get-chats/:id", requireLogin, chatController.GetChats);
module.exports = router;
