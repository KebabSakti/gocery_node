import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../../../../common/error/error_handler";
import { Unauthorized } from "../../../../common/error/exception";
import AuthUsecase from "../../../../port/interactor/customer/auth_usecase";
import AuthJwt from "../../jwt/customer/auth_jwt";

const usecase = new AuthUsecase(new AuthJwt());

class AuthHandler {
  async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const bearerHeader: string | undefined = req.get("authorization");

      if (bearerHeader == undefined) {
        throw new Unauthorized();
      }

      const token = bearerHeader.split(" ")[1];

      const userId = await usecase.verify(token);

      if (userId != null) {
        req.app.locals.user = userId;

        next();

        return;
      }

      throw new Unauthorized();
    } catch (error) {
      new ErrorHandler(res, error);
    }
  }
}

export default AuthHandler;
