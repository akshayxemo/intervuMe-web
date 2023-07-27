const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Mentor = mongoose.model("Mentor");
module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  //authorization === Bearer ewefwegwrherhe
  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  await jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be logged in" });
    }

    const { userId } = payload;
    Mentor.findById(userId).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};
