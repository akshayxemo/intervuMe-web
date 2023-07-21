const mongoose = require("mongoose");
const joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    emailId: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    subscription: {
      type: String,
      default: "Free",
    },
    subscriptionToken: String,
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);

const validate = (data) => {
  const schema = joi.object({
    name: joi.string().required().label("name"),
    gender: joi.string().required().label("gender"),
    email: joi.string().email().required().label("email"),
    password: PasswordComplexity().required().label("password"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
