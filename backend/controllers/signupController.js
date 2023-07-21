const bcrypt = require("bcryptjs");
const { User, validate } = require("../models/user.model");
const jwt = require("jsonwebtoken");
// const sendMail = require("../util/sendMail");

module.exports = {
  post: async (req, res) => {
    console.log(req.body);
    // validating the posting data
    const { error } = validate(req.body);
    if (error) {
      console.log("not validate :" + error.details[0].message);
      return res.status(400).json({ message: error.details[0].message });
    }

    // finding if the user is already exist or not
    const foundUser = await User.findOne({ emailId: req.body.email });
    if (foundUser) {
      return res.status(409).json({ message: "User Email Already Exist" });
    }
    // Hashed the Password
    const salt = await bcrypt.genSaltSync(Number(process.env.SALT_ROUND));
    const hash = await bcrypt.hashSync(req.body.password, salt);
    // console.log("Hash is "+hash+" salt:"+salt)

    // Create a new user
    const newUser = new User({
      username: req.body.name,
      gender: req.body.gender,
      emailId: req.body.email,
      password: hash,
    });

    // Save it to the database
    await newUser
      .save()
      .then(() => {
        console.log("user id :" + newUser._id);
        // Generate the JWT token
        const token = jwt.sign(
          { userId: newUser._id },
          process.env.JWT_SECRET_KEY
        );
        // sendMail(
        //   req.body.email,
        //   "[InterVuMe] SIGN UP Success ✅",
        //   `CONGRATULATIONS!! ${req.body.name}\nYou have successfully signed up with us`
        // );
        res.json({ token });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  },
};
