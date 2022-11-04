import express, { Request, Response } from "express";
import AuthFirebase from "../../../../feature/customer/auth/datasource/auth_firebase";
import AuthRepository from "../../../../feature/customer/auth/repository/auth_repository";
import CustomerRepository from "../../../../feature/customer/user/repository/customer_repository";
import CustomerMysql from "../../../../feature/customer/user/datasource/customer_mysql";
import ErrorHandler from "../../../service/error_handler";
import CustomerModel from "../../../../feature/customer/user/model/customer_model";

const router = express.Router();
const customerAuth: AuthRepository = new AuthFirebase();
const customerRepository: CustomerRepository = new CustomerMysql();

router.post("/", async (req: Request, res: Response) => {
  try {
    // const uid: string = await customerAuth.verify(req.body.token);

    const uid: string = req.body.uid;

    let customer: CustomerModel | null = await customerRepository.getUser(uid);

    if (customer == null) {
      customer = new CustomerModel(
        undefined,
        uid,
        req.body.name,
        req.body.email,
        req.body.phone
      );

      await customerRepository.insertUser(customer);
    }

    res.json(customer);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
