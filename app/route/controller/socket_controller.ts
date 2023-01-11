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

    socket.on("chatUpdate", (payload, callback) => {
      socket.to(room).emit("chatUpdate", payload);

      callback({ error: null, payload: payload });
    });

    socket.on("orderStatusUpdate", (payload, callback) => {
      socket.to(room).emit("orderStatusUpdate", payload);

      callback({ error: null, payload: payload });
    });

    socket.on("paymentStatusUpdate", (payload, callback) => {
      socket.to(room).emit("paymentStatusUpdate", payload);

      callback({ error: null, payload: payload });
    });
  });
};

export default socketController;
