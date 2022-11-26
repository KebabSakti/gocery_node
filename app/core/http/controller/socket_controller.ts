import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io";

type SocketType = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;

const socketController = (socket: SocketType) => {
  socket.on("user:joined", (payload) => {
    socket.data.username = payload.username;

    console.log(`${socket.data.username} joined`);

    socket.emit("user:joined", "Hello");
  });

  socket.on("disconnect", () => {
    console.log(`${socket.data.username} disconnected`);
  });
};

export default socketController;
