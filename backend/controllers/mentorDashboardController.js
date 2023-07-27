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
};
