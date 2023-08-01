const Chat = require("../models/chat.model");
module.exports = {
  mentorSendChat: async (req, res) => {
    const socket = req.app.get("socket");
    const { to, msg } = req.body;
    if (!req.user._id) {
      res.status(400).send("mentor not found");
    }
    const newChat = new Chat({
      to: to,
      from: req.user._id,
      message: msg,
    });

    newChat
      .save()
      .then(() => {
        res.status(200).send(newChat);
        socket
          .to(`chat-${newChat.from.toString()}`)
          .emit("newMessage", newChat);
      })
      .catch((error) => {
        res.status(400).send("server error: chat could not saved");
      });
  },
  GetChats: async (req, res) => {
    const id = req.params.id;
    if (!req.user._id) {
      res.status(400).send("mentor not found");
    }
    await Chat.find({
      $or: [
        { $and: [{ to: req.user._id }, { from: id }] }, // My id (userId1) to other user (userId2)
        { $and: [{ to: id }, { from: req.user._id }] }, // Other user (userId2) to me (userId1)
      ],
    })
      .sort({ createdAt: 1 })
      .then((chats) => {
        if (chats) {
          res.status(200).send(chats);
        } else {
          res.status(200).send("no chat found");
        }
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  userSendChat: async (req, res) => {
    const socket = req.app.get("socket");
    const { to, msg } = req.body;
    if (!req.user._id) {
      res.status(400).send("mentor not found");
    }
    const newChat = new Chat({
      to: to,
      from: req.user._id,
      message: msg,
    });

    newChat
      .save()
      .then(() => {
        socket
          .to(`chat-${newChat.from.toString()}`)
          .emit("newMessage", newChat);
        res.status(200).send(newChat);
      })
      .catch((error) => {
        res.status(400).send("server error: chat could not saved");
      });
  },
};
