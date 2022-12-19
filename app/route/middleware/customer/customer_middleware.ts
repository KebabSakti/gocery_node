import { NextFunction, Request, Response } from "express";
import AuthJwt from "../../../adapter/service/jwt/customer/auth_jwt";
import ErrorHandler from "../../../common/error/error_handler";
import { Unauthorized } from "../../../common/error/exception";
import AuthUsecase from "../../../port/interactor/customer/auth_usecase";

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
