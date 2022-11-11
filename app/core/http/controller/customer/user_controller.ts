import express, { Request, Response } from "express";
import CustomerRepository from "../../../../feature/customer/user/repository/customer_repository";
import CustomerMysql from "../../../../feature/customer/user/datasource/customer_mysql";
import CustomerModel from "../../../../feature/customer/user/model/customer_model";
import ErrorHandler from "../../../service/error_handler";
import { ResourceNotFound } from "../../../config/errors";

const router = express.Router();
const customerRepo: CustomerRepository = new CustomerMysql();

router.get("/:uid", async (req: Request, res: Response) => {
  try {
    const customerUser: CustomerModel | null = await customerRepo.show(
      req.params.uid
    );

    if (customerUser == null) {
      throw new ResourceNotFound("Resource not found");
    }

    res.json(customerUser);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.put("/", async (req: Request, res: Response) => {
  try {
    const customerModel: CustomerModel = {
      uid: req.body.uid,
      name: req.body.name,
      email: req.body.email,
    };

    await customerRepo.update(customerModel);

    res.end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
