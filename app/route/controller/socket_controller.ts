import { Server } from "socket.io";
import socketMiddelware from "../middleware/socket_middleware";

const socketController = (io: Server) => {
  io.use(socketMiddelware);

  io.on("connection", (socket) => {
    const room = socket.data.id;

    socket.on("joinRoom", () => {
      socket.join(room);
    });

    socket.on("leaveRoom", () => {
      socket.leave(room);
    });

    socket.on("chatSend", (payload, callback) => {
      socket.to(room).emit("chatSend", payload);

      callback({ error: null, payload: payload });
    });

    socket.on("chatRead", (payload, callback) => {
      socket.to(room).emit("chatRead", payload);

      callback({ error: null, payload: payload });
    });

    socket.on("orderSubmit", (payload, callback) => {
      socket.to(room).emit("orderSubmit", payload);

      callback({ error: null, payload: payload });
    });

    socket.on("orderSelect", (payload, callback) => {
      socket.to(room).emit("orderSelect", payload);

      callback({ error: null, payload: payload });
    });

    socket.on("orderCancel", (payload, callback) => {
      socket.to(room).emit("orderCancel", payload);

      callback({ error: null, payload: payload });
    });

    socket.on("orderComplete", (payload, callback) => {
      socket.to(room).emit("orderComplete", payload);

      callback({ error: null, payload: payload });
    });

    socket.on("paymentComplete", (payload, callback) => {
      socket.to(room).emit("paymentComplete", payload);

      callback({ error: null, payload: payload });
    });

    socket.on("paymentCancel", (payload, callback) => {
      socket.to(room).emit("paymentCancel", payload);

      callback({ error: null, payload: payload });
    });

    socket.on("paymentExpire", (payload, callback) => {
      socket.to(room).emit("paymentExpire", payload);

      callback({ error: null, payload: payload });
    });
  });
};

export default socketController;
