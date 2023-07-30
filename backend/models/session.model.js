const mongoose = require("mongoose");
// const joi = require("joi");
// joi.objectId = require("joi-objectid")(joi);
const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
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
      default: "upcoming",
    },
    sessionToken: {
      type: String,
      required: true,
    },
    result: {
      technicalSkill: Number,
      problemSolving: Number,
      communicationSkill: Number,
    },
    resultStatus: {
      type: String,
      enum: ["not published", "published"],
      default: "not published",
    },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
