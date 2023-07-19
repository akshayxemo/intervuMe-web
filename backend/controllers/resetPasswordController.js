const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");
const bcrypt = require("bcryptjs");
const sendMail = require("../util/sendMail");

// input data validation
const validate = (data) => {
  const schema = joi.object({
    password: PasswordComplexity().required().label("password"),
  });

  return schema.validate(data);
};
module.exports = {
  get: async (req, res) => {
    // getting the prams
    const { id, token } = req.params;

    // varifying if the user is exist or not
    const foundUser = await User.findOne({ _id: id });
    if (!foundUser) {
      res.status(400).json({ message: "User not found or token expired" });
    }

    // varifying the token
    const secret = process.env.JWT_SECRET_KEY + foundUser.password;
    try {
      const varify = jwt.verify(token, secret);
      console.log("varified email:" + varify.email);
      // rendering the reset password page
      res.render("reset-password", { email: varify.email, error: "" });
    } catch (error) {
      res.render("failure", { error: error.message });
    }
  },

  post: async (req, res) => {
    const { id, token } = req.params;

    // varifying if the user is exist or not
    const foundUser = await User.findOne({ _id: id });
    if (!foundUser) {
      res.status(400).json({ message: "User not found or token expired" });
    }
    const secret = process.env.JWT_SECRET_KEY + foundUser.password;
    try {
      const varify = jwt.verify(token, secret);
      const { password } = req.body;
      const { error } = validate({ password: password });
      if (error) {
        res.render("reset-password", {
          email: varify.email,
          error:
            "password should be minimum of 8 characters and contain atleast 1 uppercase, 1 lowercase, 1 numeric, 1 symbol",
        });
      }

      // Hashed the Password
      const salt = await bcrypt.genSaltSync(Number(process.env.SALT_ROUND));
      const hash = await bcrypt.hashSync(password, salt);

      await User.updateOne(
        {
          _id: id,
          emailId: varify.email,
        },
        { $set: { password: hash } }
      );

      //sending email to the user
      sendMail(
        varify.email,
        "[InterVuMe] Your Password Reset Successfully ✅",
        "Your Account Password have been reset. Not you? then Contact us at akshaykrdas001@gmail.com"
      );
      //Sending response
      res.render("success");
    } catch (error) {
      res.render("failure", { error: error.message });
    }
  },
};
