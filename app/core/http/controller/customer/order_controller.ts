import express, { Request, Response } from "express";
import ErrorHandler from "../../../service/error_handler";
import { ResourceNotFound } from "../../../config/errors";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
