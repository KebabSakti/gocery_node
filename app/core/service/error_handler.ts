import { Response } from "express";
import * as e from "../config/errors";

class ErrorHandler {
  constructor(res: Response, error: any) {
    let status = 500;
    let message = error.message;

    if (error instanceof e.BadRequest) {
      status = 400;
      if (message.length == 0) message = "Request parameter invalid";
    }

    if (error instanceof e.ResourceNotFound) {
      status = 404;
      if (message.length == 0) message = "Resource not found";
    }

    if (error instanceof e.Unauthorized) {
      status = 401;
      if (message.length == 0) message = "Unauthorized";
    }

    res.status(status).json(message);
  }
}

export default ErrorHandler;
