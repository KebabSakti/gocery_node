import express, { Request, Response } from "express";
import ErrorHandler from "../../common/error/error_handler";

const router = express.Router();

router.get("*", async (req: Request, res: Response) => {
  try {
    // const iterates: number[] = [...Array(20).keys()];

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
