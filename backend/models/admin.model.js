const mongoose = require("mongoose");
const joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
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
  },
  {
    timestamps: true,
  }
);
const Admin = mongoose.model("Admin", adminSchema);

const validate = (data) => {
  const schema = joi.object({
    name: joi.string().required().label("name"),
    gender: joi.string().required().label("gender"),
    email: joi.string().email().required().label("email"),
    password: PasswordComplexity().required().label("password"),
  });
  return schema.validate(data);
};

module.exports = { Admin, validate };
