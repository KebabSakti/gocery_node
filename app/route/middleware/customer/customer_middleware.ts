import { NextFunction, Request, Response } from "express";
import AuthHandler from "../../../adapter/service/express/customer/auth_handler";

const handler = new AuthHandler();

function customerMiddleware(req: Request, res: Response, next: NextFunction) {
  handler.verify(req, res, next);
}

export default customerMiddleware;
