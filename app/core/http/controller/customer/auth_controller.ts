import express, { Request, Response } from "express";
import AuthFirebase from "../../../../feature/customer/auth/datasource/auth_firebase";
import AuthRepository from "../../../../feature/customer/auth/repository/auth_repository";
import CustomerRepository from "../../../../feature/customer/user/repository/customer_repository";
import CustomerMysql from "../../../../feature/customer/user/datasource/customer_mysql";
import ErrorHandler from "../../../service/error_handler";
import HelperService from "../../../service/helper_service";
import CustomerModel from "../../../../feature/customer/user/model/customer_model";

const router = express.Router();
const customerAuth: AuthRepository = new AuthFirebase();
const customerRepository: CustomerRepository = new CustomerMysql();

router.post("/", async (req: Request, res: Response) => {
  try {
    const uid: string = await customerAuth.verify(req.body.token);

    let customer: CustomerModel | null = await customerRepository.show(uid);

    if (customer == null) {
      customer = {
        uid: uid,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        created_at: HelperService.sqlDateNow(),
        updated_at: HelperService.sqlDateNow(),
      };

      await customerRepository.store(customer);
    }

    res.json(customer);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
