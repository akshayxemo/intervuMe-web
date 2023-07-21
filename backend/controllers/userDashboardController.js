const Session = require("../models/session.model");
const Mentor = require("../models/mentor.model");
const cron = require("node-cron");
const { default: mongoose } = require("mongoose");
module.exports = {
  get: async (req, res) => {
    console.log(req.user);
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
        res.status(200).send({ username: req.user.username, error: err });
      });
  },

  sessionAdd: async (req, res) => {
    console.log(req.body);
    console.log("user " + req.user._id);

    const newSession = new Session({
      userId: req.user._id,
      mentorId: req.body.mentorId,
      sessionDate: `${req.body.sessionDate}, ${req.body.sessionTime}`,
      sessionTime: req.body.sessionTime,
      status: req.body.status,
    });
    await newSession
      .save()
      .then(() => {
        res.status(200).send({ message: "Session Successfully Added" });
      })
      .catch((err) => {
        res.status(401).send({ error: "Server Error:" + err });
      });
  },
};
