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
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
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

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);
  const { token } = socket.handshake.query;

  // Handle join room event
  socket.on("joinRoom", async (token) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, payload) => {
      if (error) {
        console.log(error);
        return;
      } else {
        const { userId } = payload;
        console.log(`joined room ${userId}`);
        socket.join(userId); // Join the specific room (using userId as the room name)
        socket.broadcast.emit("i-am-joined", userId);
      }
    });
  });

  socket.on("joinRoomMentorTimeUpdate", async (token, id) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, payload) => {
      if (error) {
        console.log(error);
        return;
      } else {
        const { userId } = payload;
        console.log(`joined room ${id}`);
        if (userId) {
          socket.join(`mentorSessionTimeUpdate${id}`);
        } // Join the specific room (using userId as the room name)
      }
    });
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
      socket.on("endCall", (signal) => {
        socket.to(roomId).emit("endCallRecived", signal);
        socket.leave(roomId);
      });
      socket.on("mic-off", (val) => {
        socket.to(roomId).emit("mic-off", val);
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

  // socket.to().emit("newMessage", newChat);
  socket.on("join-chat", (id) => {
    socket.join(`chat-${id}`);
    console.log("join-chat-trigger......." + id);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    socket.broadcast.emit("callEnded");
  });
});

const updateSessionStatuses = require("./util/cron");
cron.schedule("* * * * *", () => {
  console.log("job..");
  updateSessionStatuses(io);
});

// routers
app.use(require("./routers/auth"));
app.use(require("./routers/dashboard"));
app.use(require("./routers/chat"));

// listening code
http.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
