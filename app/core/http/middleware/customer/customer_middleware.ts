import { NextFunction, Request, Response } from "express";
import AuthJwt from "../../../../feature/customer/auth/framework/jwt/auth_jwt";
import AuthUsecase from "../../../../feature/customer/auth/usecase/auth_usecase";
import { Unauthorized } from "../../../config/errors";
import ErrorHandler from "../../../service/error_handler";

const usecase = new AuthUsecase(new AuthJwt());

async function customerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

export default customerMiddleware;
