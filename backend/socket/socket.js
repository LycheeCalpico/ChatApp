import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const userSocketMap = {};
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
  },
});
export const getReceiverId = (receiverId) => userSocketMap[receiverId];
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  console.log("a server connected", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
