import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import AuthHandler from "../../adapter/service/socketio/auth_handler";

type SocketIoNextFunction = (err?: ExtendedError | undefined) => void;

const handler = new AuthHandler();

const socketMiddelware = (socket: Socket, next: SocketIoNextFunction) => {
  handler.verify(socket, next);
};

export default socketMiddelware;
