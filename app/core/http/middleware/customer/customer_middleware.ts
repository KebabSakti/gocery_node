import { Request, Response, NextFunction } from "express";
import AuthRepository from "../../../../feature/customer/auth/repository/auth_repository";
import AuthFirebase from "../../../../feature/customer/auth/datasource/auth_firebase";
import ErrorHandler from "../../../service/error_handler";
import { Unauthorized } from "../../../config/errors";

const auth: AuthRepository = new AuthFirebase();

async function customerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bearerHeader: string | undefined = req.get("authorization");

    if (bearerHeader == undefined) {
      throw new Unauthorized("Bearer header not found");
    }

    const token = bearerHeader.split(" ")[1];

    await auth.verify(token);

    next();
  } catch (error) {
    new ErrorHandler(res, error);
  }
}

export default customerMiddleware;
