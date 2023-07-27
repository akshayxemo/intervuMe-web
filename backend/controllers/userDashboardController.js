const Session = require("../models/session.model");
const { Mentor } = require("../models/mentor.model");
module.exports = {
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
    console.log(socket);
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
      .then((session) => {
        socket
          .to(`mentorSessionTimeUpdate${session.mentorId}`)
          .emit("MentorBookingUpdate", session);
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
};
