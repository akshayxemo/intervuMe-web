const Session = require("../models/session.model");

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
        console.log(session.userId);
        await socket
          .to(session.userId.toString())
          .emit("sessionUpdateds", session);
        await socket
          .to(session.userId.toString())
          .emit("sessionNotification", "your session is completed");
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
        await socket
          .to(session.userId.toString())
          .emit("sessionNotification", "you have an Ongoing Session");
      } else if (
        timeDifference <= 60000 &&
        session.status !== "ongoing" &&
        session.status !== "completed"
      ) {
        // Emit the updated session data to connected clients via Socket.IO
        await socket
          .to(session.userId.toString())
          .emit("sessionNotification", "your session will start in 1 minute");
      }
    }
  } catch (error) {
    console.error("Error updating session statuses:", error);
  }
};

module.exports = updateSessionStatuses;
