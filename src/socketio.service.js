import { io } from "socket.io-client";

let socket;

export const innitiateSocketConnection = () => {
  socket = io(process.env.REACT_APP_SOCKET_ENDPOINT, {
    auth: { token: localStorage.getItem("jwtToken") },
  });
  console.log("connecting socket");
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) {
    socket.disconnect();
  }
};

export const subscribeToChat = (cb) => {
  socket.emit("my message", "hello froom react");
  socket.on("my broadcast", (msg) => {
    return cb(null, msg);
  });
};

export const subscribeToMessages = (cb) => {
  if (!socket) return true;
  socket.on("message", (msg) => {
    console.log("room event recieved");
    return cb(null, msg);
  });
};

export const sendMessage = ({ message, roomName }, cb) => {
  if (socket) {
    socket.emit("message", { message, roomName }, cb);
  }
};
