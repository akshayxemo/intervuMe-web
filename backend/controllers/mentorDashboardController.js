const Session = require("../models/session.model");
const { User } = require("../models/user.model");
module.exports = {
  get: async (req, res) => {
    await Session.aggregate([
      { $match: { mentorId: req.user._id } },
      {
        $lookup: {
          from: "users", // Collection name of Mentor model
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails", // Unwind the mentorDetails array (since it's a 1-to-1 relationship)
      },
      {
        $project: {
          sessionDate: 1,
          sessionTime: 1,
          status: 1,
          userId: "$userDetails._id",
          userName: "$userDetails.username",
          userEmail: "$userDetails.emailId",
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
  generateResult: async (req, res) => {
    const socket = req.app.get("socket");
    const {
      userId,
      sessionId,
      technicalSkill,
      problemSolving,
      communicationSkill,
    } = req.body;
    await Session.findById(sessionId)
      .then((foundSession) => {
        console.log(foundSession);
        if (foundSession.resultStatus === "not published") {
          if (
            foundSession.userId.toString() == userId.toString() &&
            foundSession.mentorId.toString() == req.user._id.toString()
          ) {
            if (technicalSkill && problemSolving && communicationSkill) {
              Session.updateOne(
                { _id: foundSession._id },
                {
                  result: {
                    technicalSkill: parseFloat(technicalSkill),
                    problemSolving: parseFloat(problemSolving),
                    communicationSkill: parseFloat(communicationSkill),
                  },
                  resultStatus: "published",
                  status: "completed",
                }
              )
                .then((session) => {
                  console.log(session);
                  socket
                    .to(foundSession.userId.toString())
                    .emit("sessionUpdateds", session);
                  socket
                    .to(foundSession.userId.toString())
                    .emit(
                      "sessionNotification",
                      "your session has been completed and result published"
                    );
                  res.status(200).send("result generated successfully");
                })
                .catch((error) => {
                  console.log(error);
                  res.status(400).json("error:" + error);
                });
            } else {
              res.status(400).send({ error: "incomplete fields" });
            }
          } else {
            res.status(400).send({ error: "user and mentor not matched" });
          }
        } else {
          res
            .status(400)
            .send({ error: "Result for this session is already published" });
        }
      })
      .catch((error) => {
        res.status(400).json("error:" + error);
      });
  },
};
