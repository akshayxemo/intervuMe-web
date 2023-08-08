const { Admin, validate } = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");
const LoginValidate = (data) => {
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
    const { error } = LoginValidate(req.body);
    if (error) {
      console.log("not validate :" + error.details[0].message);
      return res.status(400).json({ message: error.details[0].message });
    }

    // finding the user
    await Admin.findOne({ emailId: req.body.email })
      .then((foundAdmin) => {
        // varifing the password
        console.log(foundAdmin);
        if (bcrypt.compareSync(req.body.password, foundAdmin.password)) {
          const token = jwt.sign(
            { userId: foundAdmin._id },
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
    const { error } = validate(req.body);
    if (error) {
      console.log("not validate :" + error.details[0].message);
      return res.status(400).json({ message: error.details[0].message });
    }

    // finding if the user is already exist or not
    const foundAdmin = await Admin.findOne({ emailId: req.body.email });
    if (foundAdmin) {
      return res.status(409).json({ message: "Admin Already Exist" });
    }
    // Hashed the Password
    const salt = await bcrypt.genSaltSync(Number(process.env.SALT_ROUND));
    const hash = await bcrypt.hashSync(req.body.password, salt);
    // console.log("Hash is "+hash+" salt:"+salt)

    // Create a new user
    const newAdmin = new Admin({
      username: req.body.name,
      gender: req.body.gender,
      emailId: req.body.email,
      password: hash,
    });

    // Save it to the database
    await newAdmin
      .save()
      .then(() => {
        console.log("Admin id :" + newAdmin._id);
        // Generate the JWT token
        const token = jwt.sign(
          { userId: newAdmin._id },
          process.env.JWT_SECRET_KEY
        );
        res.json({ token });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  },
};
