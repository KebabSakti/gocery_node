import express, { Request, Response } from "express";
import CustomerRepository from "../../../../feature/customer/user/repository/customer_repository";
import { CustomerModel } from "../../../../feature/customer/user/model/customer_model";
import ErrorHandler from "../../../service/error_handler";
import CustomerMongo from "../../../../feature/customer/user/datasource/customer_mongo";

const router = express.Router();
const customerRepo: CustomerRepository = new CustomerMongo();

router.get("/:external_id/show", async (req: Request, res: Response) => {
  try {
    const customerUser = await customerRepo.show(req.params.external_id);

    res.json(customerUser);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.put("/:external_id", async (req: Request, res: Response) => {
  try {
    const customerModel: CustomerModel = {
      external_id: req.params.external_id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: req.body.image,
    };

    await customerRepo.update(customerModel);

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
