import { NextFunction, Request, Response } from "express";
import { Unauthorized } from "../../../../../core/config/errors";
import ErrorHandler from "../../../../../core/service/error_handler";
import AuthUsecase from "../../../../../port/interactor/customer/auth_usecase";
import AuthJwt from "../../../jwt/customer/auth_jwt";

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
