import AuthValidatorJoi from "../../../feature/customer/auth/framework/joi/auth_validator_joi";
import AuthJwt from "../../../feature/customer/auth/framework/jwt/auth_jwt";
import CustomerMongodb from "../../../feature/customer/auth/framework/mongodb/customer_mongodb";
import AuthUsecase from "../../../feature/customer/auth/usecase/auth_usecase";
import { Unauthorized } from "./../../config/errors";

const usecase: AuthUsecase = new AuthUsecase(
  new CustomerMongodb(),
  new AuthJwt(),
  new AuthValidatorJoi()
);

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
