let { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
module.exports = {
  get: async (req, res) => {
    console.log(req.user);
    res.status(200).send(req.user.username);
  },
};
