import { Response } from "express";
import * as e from "../config/errors";

class ErrorHandler {
  constructor(res: Response, error: any) {
    let status: number = 500;

    if (error instanceof e.ResourceNotFound) {
      status = 404;
    }

    if (error instanceof e.Unauthorized) {
      status = 401;
    }

    res.status(status).json(error.message);
  }
}

export default ErrorHandler;
