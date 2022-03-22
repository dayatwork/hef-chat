require("dotenv").config();
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://hospital-engineering-expo.com"],
  },
});

const uploadRoute = require("./routes/upload");
const conversationsRoute = require("./routes/conversations");
const messagesRoute = require("./routes/messages");
const sponsorRoute = require("./routes/sponsors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("body", req.body);
  res.json({
    message: "Hello world",
  });
});

app.use("/api/upload", uploadRoute);
app.use("/api/conversations", conversationsRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/sponsors", sponsorRoute);

// ======= Socket IO =======
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("a user connected");

  // Take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Send and Get Message
  socket.on("sendMessage", ({ _id, senderId, receiverId, text, createdAt }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", {
        _id,
        senderId,
        text,
        createdAt,
      });
    }
  });

  // When disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
// ======= End Socket IO =======

console.log({ users });

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    server.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
