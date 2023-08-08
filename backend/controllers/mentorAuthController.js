const bcrypt = require("bcryptjs");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const { Mentor, MentorValidate } = require("../models/mentor.model");
const Online = require("../models/online.model");
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
  signup: async (req, res) => {
    console.log(req.body);
    // validating the posting data
    const { error } = MentorValidate(req.body);
    if (error) {
      console.log("not validate :" + error.details[0].message);
      return res.status(400).json({ message: error.details[0].message });
    }

    // finding if the user is already exist or not
    const foundMentor = await Mentor.findOne({ emailId: req.body.email });
    if (foundMentor) {
      return res.status(409).json({ message: "Mentor Already Exist" });
    }
    // Hashed the Password
    const salt = await bcrypt.genSaltSync(Number(process.env.SALT_ROUND));
    const hash = await bcrypt.hashSync(req.body.password, salt);
    // console.log("Hash is "+hash+" salt:"+salt)

    // Create a new user
    const newMentor = new Mentor({
      username: req.body.name,
      gender: req.body.gender,
      emailId: req.body.email,
      password: hash,
      workAt: req.body.workAt,
      role: req.body.role,
      availableTimes: req.body.availableTimes,
    });

    // Save it to the database
    await newMentor
      .save()
      .then(() => {
        console.log("Mentor id :" + newMentor._id);
        const newOnline = new Online({
          id: newMentor._id,
        });
        newOnline
          .save()
          .then(() => {
            // Generate the JWT token
            const token = jwt.sign(
              { userId: newMentor._id },
              process.env.JWT_SECRET_KEY
            );
            res.json({ token });
          })
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  },
};
