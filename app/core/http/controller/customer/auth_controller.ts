import express, { Request, Response } from "express";
import AuthFirebase from "../../../../feature/customer/auth/datasource/auth_firebase";
import { AuthRepository } from "../../../../feature/customer/auth/repository/auth_repository";
import CustomerMongo from "../../../../feature/customer/user/datasource/customer_mongo";
import { CustomerModel } from "../../../../feature/customer/user/model/customer_model";
import CustomerRepository from "../../../../feature/customer/user/repository/customer_repository";
import ErrorHandler from "../../../service/error_handler";

const router = express.Router();
const customerAuth: AuthRepository = new AuthFirebase();
const customerRepository: CustomerRepository = new CustomerMongo();

router.post("/", async (req: Request, res: Response) => {
  try {
    const id: string = await customerAuth.verify(req.body.token);

    let customer: CustomerModel | null = await customerRepository.show(id);

    if (customer == null) {
      customer = {
        external_id: id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.body.image,
      };

      await customerRepository.store(customer);
    }

    req.app.locals.user = customer._id;

    res.json(customer);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
