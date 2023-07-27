const { Mentor } = require("../models/mentor.model");
const bcrypt = require("bcryptjs");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const PasswordComplexity = require("joi-password-complexity");

const validate = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().label("email"),
    password: PasswordComplexity().required().label("password"),
  });

  return schema.validate(data);
};

module.exports = {
  login: async (req, res) => {
    console.log(req.body);
    // validating the posting data
    const { error } = validate(req.body);
    if (error) {
      console.log("not validate :" + error.details[0].message);
      return res.status(400).json({ message: error.details[0].message });
    }

    // finding the user
    await Mentor.findOne({ emailId: req.body.email })
      .then((foundMentor) => {
        // varifing the password
        console.log(foundMentor);
        if (bcrypt.compareSync(req.body.password, foundMentor.password)) {
          const token = jwt.sign(
            { userId: foundMentor._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
          );
          res
            .status(200)
            .send({ token: token, messsage: "Logged in Successfully" });
        } else {
          res.status(401).send({ message: "Invalid Email or Password" });
        }
      })
      .catch((err) =>
        res.status(401).send({ message: "Invalid Email or Password" })
      );
  },
};
