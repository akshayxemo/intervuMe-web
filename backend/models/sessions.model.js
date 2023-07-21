const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    mentorId: {
      type: ObjectId,
      ref: "Mentor",
      required: true,
    },
    sessionDate: {
      type: Date,
      required: true,
    },
    sessionTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled", "missed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
