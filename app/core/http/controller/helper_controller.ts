import express, { Request, Response } from "express";
import ErrorHandler from "../../service/error_handler";

const router = express.Router();

router.get("*", async (req: Request, res: Response) => {
  try {
    // const iterates: number[] = [...Array(20).keys()];

    // for (const _ of iterates) {
    //   await PaymentScheme.create({
    //     category: faker.finance.transactionType(),
    //     code: faker.random.numeric(6),
    //     name: faker.finance.creditCardIssuer(),
    //     picture: faker.image.abstract(),
    //     fee: faker.random.numeric(4),
    //   });
    // }

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
