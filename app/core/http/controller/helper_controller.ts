import { faker } from "@faker-js/faker";
import { PaymentScheme } from "./../../../feature/customer/payment/model/payment_model";
import express, { Request, Response } from "express";
import ErrorHandler from "../../service/error_handler";
import { BundleScheme } from "../../../feature/customer/bundle/model/bundle_model";
import { CategoryScheme } from "../../../feature/customer/category/model/category_model";
import { CustomerScheme } from "../../../feature/customer/user/model/customer_model";
import { ProductScheme } from "../../../feature/customer/product/model/product_model";

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

    await ProductScheme.updateMany({}, { active: true });

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
