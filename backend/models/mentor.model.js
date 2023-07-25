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
    workAt: String,
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
    availableTimes: {
      0: Array,
      1: Array,
      2: Array,
      3: Array,
      4: Array,
      5: Array,
      6: Array,
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
    image: joi.string().label("image"),
    workAt: joi.string().required().label("workAt"),
    role: joi.string().required().label("role"),
    availableTimes: joi
      .object()
      .pattern(
        joi.number().integer().min(0).max(6),
        joi.array().items(joi.string())
      )
      .label("availableTimes"),
  });
  return schema.validate(data);
};

const Mentor = mongoose.model("Mentor", mentorSchema);
module.exports = { Mentor, MentorValidate };
