import { NextFunction, Request, Response } from "express";
import { DateTime } from "luxon";

function baseMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(
    DateTime.utc().setZone("Asia/Kuala_Lumpur").toFormat("yyyy-LL-dd hh:mm:ss")
  );

  next();
}

export default baseMiddleware;
