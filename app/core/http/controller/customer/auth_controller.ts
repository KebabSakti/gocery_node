import express, { Request, Response } from "express";
import CustomerModel from "../../../../feature/customer/auth/entity/model/customer_model";
import AuthValidatorJoi from "../../../../feature/customer/auth/framework/joi/auth_validator_joi";
import AuthJwt from "../../../../feature/customer/auth/framework/jwt/auth_jwt";
import CustomerMongodb from "../../../../feature/customer/auth/framework/mongodb/customer_mongodb";
import AuthUsecase from "../../../../feature/customer/auth/usecase/auth_usecase";
import ErrorHandler from "../../../service/error_handler";
import { Unauthorized } from "./../../../config/errors";

const router = express.Router();

const usecase = new AuthUsecase(
  new CustomerMongodb(),
  new AuthJwt(),
  new AuthValidatorJoi()
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

    const results = await usecase.access(model);

    if (results == null) {
      throw new Unauthorized();
    }

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
