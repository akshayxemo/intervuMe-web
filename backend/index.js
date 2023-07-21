const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Import required modules
const http = require("http").Server(app);
const socketIO = require("socket.io");

// setting up server side rendering view engine
app.set("view engine", "ejs");
// setting public folder accessable for all views
app.use(express.static("public"));

//database connection
const dbConnect = require("./config/db.config");
dbConnect();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Set up Socket.IO server
const io = socketIO(http);
app.set("io", io);

// routers
app.use(require("./routers/auth"));
app.use(require("./routers/dashboard"));

// listening code
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
