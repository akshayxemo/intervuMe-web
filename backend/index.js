const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");

// Import required modules
const http = require("http").Server(app);
const socketIO = require("socket.io");
const cron = require("node-cron");

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
const io = socketIO(http, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST"], // Allow only specified HTTP methods (you can add more if needed)
    credentials: true, // Allow credentials (e.g., cookies, authentication headers)
  },
});
// some require utilities
app.set("socket", io);
// console.log(io);
// socket connection
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);
  const { token } = socket.handshake.query;
  // Handle join room event
  socket.on("joinRoom", async (token) => {
    const { userId } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(`joined room ${userId}`);
    socket.join(userId); // Join the specific room (using userId as the room name)
  });

  socket.on("joinRoomMentorTimeUpdate", async (token, id) => {
    const { userId } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(`joined room ${id}`);
    if (userId) {
      socket.join(`mentorSessionTimeUpdate${id}`);
    } // Join the specific room (using userId as the room name)
  });

  socket.on("join-video-call", async (token) => {
    const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (payload) {
      const roomId = `videoRoom-${payload.userId}-${payload.mentorId}`;
      console.log(roomId);
      socket.join(roomId);
      socket.to(roomId).emit("user-joined", socket.id);
      socket.on("user-joined", (id) => {
        socket.to(roomId).emit("user-joined", id);
      });
      socket.on("leave-room", (id) => {
        socket.to(roomId).emit("leave-room", id);
      });
    }
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    socket.broadcast.emit("callEnded");
  });
});

cron.schedule("* * * * *", () => {
  updateSessionStatuses(io);
});

// routers
app.use(require("./routers/auth"));
app.use(require("./routers/dashboard"));

// listening code
http.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
