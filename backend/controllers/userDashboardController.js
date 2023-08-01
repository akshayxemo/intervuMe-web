const Session = require("../models/session.model");
const { Mentor } = require("../models/mentor.model");
const { User } = require("../models/user.model");
const Follow = require("../models/follow.model");
const jwt = require("jsonwebtoken");
module.exports = {
  getUserDetails: async (req, res) => {
    console.log(req.body.userId);
    const { userId } = req.body;
    await User.findOne({ _id: userId })
      .then((foundUser) => {
        console.log(foundUser);
        const userDetails = {
          userId: foundUser._id.toString(),
          username: foundUser.username,
          gender: foundUser.gender,
          emailId: foundUser.emailId,
          subscription: foundUser.subscription,
        };
        res.status(200).json(userDetails);
      })
      .catch((error) => {
        console.log(error);
        res.status(401).send({ error: error.toString() });
      });
  },
  get: async (req, res) => {
    await Session.aggregate([
      { $match: { userId: req.user._id } },
      {
        $lookup: {
          from: "mentors", // Collection name of Mentor model
          localField: "mentorId",
          foreignField: "_id",
          as: "mentorDetails",
        },
      },
      {
        $unwind: "$mentorDetails", // Unwind the mentorDetails array (since it's a 1-to-1 relationship)
      },
      {
        $project: {
          sessionDate: 1,
          sessionTime: 1,
          status: 1,
          mentorId: "$mentorDetails._id",
          mentorName: "$mentorDetails.username",
          mentorRole: "$mentorDetails.role",
          mentorEmail: "$mentorDetails.emailId",
          sessionToken: 1,
          resultStatus: 1,
          result: 1,
        },
      },
    ])
      .sort("sessionDate")
      .then((sessions) => {
        res
          .status(200)
          .send({ username: req.user.username, sessions: sessions });
      })
      .catch((err) => {
        console.error(err);
        res.status(200).send({ username: req.user.username, error: err });
      });
  },

  sessionAdd: async (req, res) => {
    const socket = req.app.get("socket");
    console.log(req.body);
    console.log("user " + req.user._id);
    const Token = jwt.sign(
      {
        userId: req.user._id,
        mentorId: req.body.mentorId,
        sessionDateTime: new Date(
          `${req.body.sessionDate}, ${req.body.sessionTime}`
        ),
      },
      process.env.JWT_SECRET_KEY
    );
    console.log("session Token : ", Token);
    const newSession = new Session({
      userId: req.user._id,
      mentorId: req.body.mentorId,
      sessionDate: `${req.body.sessionDate}, ${req.body.sessionTime}`,
      sessionTime: req.body.sessionTime,
      status: req.body.status,
      sessionToken: Token,
    });
    await newSession
      .save()
      .then((session) => {
        socket
          .to(`mentorSessionTimeUpdate${session.mentorId}`)
          .emit("MentorBookingUpdate", session);
        socket
          .to(session.mentorId.toString())
          .emit("NewBooking-MentorNotification", session);
        res.status(200).send({ message: "Session Successfully Added" });
      })
      .catch((err) => {
        res.status(401).send({ error: "Internal Server Error.", details: err });
      });
  },

  getMentors: async (req, res) => {
    await Mentor.find({})
      .then((mentor) => {
        res.status(200).send({ mentor: mentor });
      })
      .catch((err) => {
        res.status(400).send({ error: err });
      });
  },

  getBookedSessions: async (req, res) => {
    console.log(req.body);
    const { mentorId, current, endOfWeek } = req.body;
    await Session.find({
      mentorId: mentorId,
      sessionDate: { $gte: current, $lte: endOfWeek },
    })
      .sort("sessionDate")
      .then((session) => {
        console.log(session);
        res.status(200).send({ sessions: session });
      })
      .catch((err) => {
        res.status(400).send({ error: err, sessions: null });
      });
  },
  getResults: async (req, res) => {
    await Session.aggregate([
      {
        $match: {
          userId: req.user._id,
          resultStatus: "published",
        },
      },
      {
        $project: {
          _id: 0,
          date: "$sessionDate", // Renaming sessionDate to date in the result
          result: 1,
        },
      },
    ])
      .sort({ sessionDate: 1 })
      .then((foundSession) => {
        console.log(foundSession);
        res.status(200).send(foundSession);
      })
      .catch((error) => {
        res.status(400).json("error : " + error);
      });
  },
  isFollowed: async (req, res) => {
    const mentorId = req.params.mentorId;
    if (!req.user._id) {
      return res.status(400).send("Your id not found");
    }
    Follow.findOne({ userId: req.user._id, mentorId: mentorId })
      .then((result) => {
        console.log("O.........................K");
        if (result) {
          res.status(200).send(true);
        } else {
          res.status(200).send(false);
        }
      })
      .catch((error) => res.status(400).send(error));
    console.log("haha ..........................." + mentorId);
  },
  follow: async (req, res) => {
    const socket = req.app.get("socket");
    const { mentorId, name } = req.body;
    if (req.user._id) {
      Follow.findOne({ userId: req.user._id, mentorId: mentorId })
        .then((found) => {
          if (found) {
            return res.status(200).send("you already follows this id");
          }
          const followObject = new Follow({
            userId: req.user._id,
            userName: req.user.username,
            mentorId: mentorId,
            mentorName: name,
          });
          followObject
            .save()
            .then(() => {
              socket.to(mentorId).emit("new-follow", req.user._id);
              socket.to(req.user._id.toString()).emit("new-follow", mentorId);
              return res.status(200).send(true);
            })
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    } else {
      res.status(400).send("id not found");
    }
  },
  findFollowings: async (req, res) => {
    if (!req.user._id) {
      return res.status(400).send("Your id not found");
    }
    Follow.find({ userId: req.user._id })
      .populate("mentorId", "role")
      .then((follows) => {
        console.log(follows);
        if (follows.length) {
          console.log("User's following list:", follows);
          res.status(200).send(follows);
        } else {
          console.log("User not found with the given ID.");
          res.status(200).send(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(400).send(error);
      });
  },
};
