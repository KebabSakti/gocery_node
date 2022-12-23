import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import AuthUsecase from "../../../port/interactor/customer/auth_usecase";
import AuthJwt from "../jwt/customer/auth_jwt";

type SocketIoNextFunction = (err?: ExtendedError | undefined) => void;

const usecase = new AuthUsecase(new AuthJwt());

class AuthHandler {
  verify(socket: Socket, next: SocketIoNextFunction) {
    try {
      const token = socket.handshake.auth.token;

      usecase.verify(token);

      next();
    } catch (error: any) {
      next(error);
    }
  }
}

export default AuthHandler;
