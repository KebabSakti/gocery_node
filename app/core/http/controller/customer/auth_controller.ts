import express, { Request, Response } from "express";
import CustomerModel from "../../../../feature/customer/auth/entity/model/customer_model";
import CustomerValidatorJoi from "../../../../feature/customer/auth/framework/joi/customer_validator_joi";
import AuthJwt from "../../../../feature/customer/auth/framework/jwt/auth_jwt";
import CustomerMongodb from "../../../../feature/customer/auth/framework/mongodb/customer_mongodb";
import CustomerUsecase from "../../../../feature/customer/auth/usecase/customer_usecase";
import { Unauthorized } from "../../../config/errors";
import ErrorHandler from "../../../service/error_handler";

const router = express.Router();

const usecase = new CustomerUsecase(
  new AuthJwt(),
  new CustomerMongodb(),
  new CustomerValidatorJoi()
);

router.post("/", async (req: Request, res: Response) => {
  try {
    const model: CustomerModel = {
      _id: req.body._id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: req.body.image,
      fcm: req.body.fcm,
    };

    const results = await usecase.store(model);

    if (results == null) {
      throw new Unauthorized();
    }

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
