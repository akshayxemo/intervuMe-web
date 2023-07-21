const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    image: String,
    role: {
      type: String,
      required: true,
    },
    socials: {
      facebook: String,
      linkedin: String,
      twitter: String,
      instagram: String,
    },
  },
  {
    timestamps: true,
  }
);

const Mentor = mongoose.model("Mentor", mentorSchema);
module.exports = Mentor;
