import AuthJwt from "../../../feature/customer/auth/framework/jwt/auth_jwt";
import AuthUsecase from "../../../feature/customer/auth/usecase/auth_usecase";
import { Unauthorized } from "../../config/errors";

const usecase = new AuthUsecase(new AuthJwt());

const socketAuth = async (socket: any, next: any) => {
  try {
    const token = socket.handshake.auth.token;

    const userId = await usecase.verify(token);

    if (userId != null) {
      socket.data.user = userId;

      next();

      return;
    }

    throw new Unauthorized();
  } catch (_) {
    next(new Unauthorized());
  }
};

export default socketAuth;
