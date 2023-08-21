const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const joi = require("joi");
// const nodemailer = require('nodemailer')
const sendMail = require("../util/sendMail");

// validation check function
const validate = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().label("email"),
  });
  return schema.validate(data);
};

module.exports = {
  post: async (req, res) => {
    // validating the email
    const { error } = validate(req.body);
    if (error) {
      console.log("not validate :" + error.details[0].message);
      return res.status(400).json({ message: error.details[0].message });
    }

    // cheking if the email is already existed or not
    const email = req.body.email;
    await User.findOne({ emailId: email })
      .then((foundUser) => {
        // if user is found via email then generate a jwt token
        const secret = process.env.JWT_SECRET_KEY + foundUser.password;
        const token = jwt.sign(
          { email: foundUser.emailId, userId: foundUser._id },
          secret,
          { expiresIn: "5m" }
        );

        // reset password link
        const link = `${process.env.FRONTEND_API}/reset-password/${foundUser._id}/${token}`;
        console.log(link);

        // sending email
        sendMail(
          foundUser.emailId,
          "[InterVuMe] Password Reset E-mail",
          `Click the link below 👇 to reset your password\n\n${link}`
        );

        // sending response to client
        res.status(200).json({ message: "Success" });
      })
      .catch((err) => {
        // if user is not found
        res.status(400).json({ message: "User is not found." });
      });
  },
};
