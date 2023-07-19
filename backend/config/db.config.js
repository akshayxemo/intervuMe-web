const mongoose = require("mongoose");
const dbConnect = () => {
  mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });
};
module.exports = dbConnect;
