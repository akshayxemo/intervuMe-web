const mongoose = require("mongoose");
const joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");

const mentorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
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

const MentorValidate = (data) => {
  const schema = joi.object({
    name: joi.string().required().label("name"),
    gender: joi.string().required().label("gender"),
    email: joi.string().email().required().label("email"),
    password: PasswordComplexity().required().label("password"),
    role: joi.string().required().label("role"),
  });
  return schema.validate(data);
};

const Mentor = mongoose.model("Mentor", mentorSchema);
module.exports = { Mentor, MentorValidate };
