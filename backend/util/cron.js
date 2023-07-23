const Session = require("../models/session.model");
// const jwt = require("jsonwebtoken");
// const { getIoInstance } = require("./socket");
// let socket = getIoInstance();

const updateSessionStatuses = async (socket) => {
  console.log("cron...");
  try {
    // Fetch all sessions from the database
    const sessions = await Session.find({
      // userId: userId,
      status: { $in: ["upcoming", "ongoing"] },
    });
    const currentDate = new Date();

    for (const session of sessions) {
      const sessionDateTime = await new Date(`${session.sessionDate}`);
      const timeDifference = sessionDateTime - currentDate;
      // console.log(`session : ${session._id}, D: ${timeDifference}`);
      if (timeDifference < -3600000 && session.status !== "completed") {
        // Session is within the next hour, update status to "completed" or other logic
        await Session.updateOne(
          { _id: session._id },
          { $set: { status: "completed" } }
        );
        // Emit the updated session data to connected clients via Socket.IO
        await console.log(session.userId);
        await socket
          .to(session.userId.toString())
          .emit("sessionUpdateds", session);
      } else if (
        timeDifference <= 0 &&
        session.status !== "ongoing" &&
        session.status !== "completed"
      ) {
        // Session has already passed, update status to "ongoing"
        await Session.updateOne(
          { _id: session._id },
          { $set: { status: "ongoing" } }
        );
        // Emit the updated session data to connected clients via Socket.IO
        await socket
          .to(session.userId.toString())
          .emit("sessionUpdateds", session);
      }
    }
  } catch (error) {
    console.error("Error updating session statuses:", error);
  }
};

module.exports = updateSessionStatuses;
