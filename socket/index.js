const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "https://turning-leaves-frontend.vercel.app", // Allow requests from the React frontend
    methods: ["GET", "POST"], // Allow only GET and POST requests
    allowedHeaders: ["my-custom-header"],
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
  }
});

app.get("/",(req,res)=>{
  res.send({
    "msg":"This is an API for the chat functionality"
  })
})

let activeUsers = [];

io.on("connection", (socket) => {
  // Add new User
  socket.on("new-user-add", (newUserId) => {
    // If user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    // Send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    // Remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    // Send all active users to all users
    io.emit("get-users", activeUsers);
  });

  // Send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to:", receiverId);
    console.log("Data:", data);
    if (user) {
      io.to(user.socketId).emit("receive-message", data);
      console.log("received-message", data); 
    }
  });
});

const PORT = process.env.PORT || 8800 ; 
server.listen(PORT, () => {
  console.log(`Socket.IO server is running on port ${PORT}`);
});
