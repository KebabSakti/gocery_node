import express, { Request, Response } from "express";
import CustomerRepository from "../../../../feature/customer/user/repository/customer_repository";
import CustomerMysql from "../../../../feature/customer/user/datasource/customer_mysql";
import CustomerModel from "../../../../feature/customer/user/model/customer_model";
import ErrorHandler from "../../../service/error_handler";
import { ResourceNotFound } from "../../../config/errors";

const router = express.Router();
const customerRepo: CustomerRepository = new CustomerMysql();

router.get("/", async (req: Request, res: Response) => {
  try {
    const customerUser: CustomerModel | null = await customerRepo.getUser(
      req.body.uid
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
    await customerRepo.updateUser(
      new CustomerModel(
        undefined,
        req.body.uid,
        req.body.name,
        req.body.email,
        req.body.password
      )
    );

    res.end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
