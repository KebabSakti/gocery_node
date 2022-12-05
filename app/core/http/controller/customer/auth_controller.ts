import { Unauthorized, BadRequest } from "./../../../config/errors";
import express, { Request, Response } from "express";
import ErrorHandler from "../../../service/error_handler";
import CustomerRepository from "../../../../feature/customer/auth/usecase/repository/customer_repository";
import CustomerMongodb from "../../../../feature/customer/auth/framework/mongodb/customer_mongodb";
import AuthFirebase from "../../../../feature/customer/auth/framework/firebase/auth_firebase";
import AuthRepository from "../../../../feature/customer/auth/usecase/repository/auth_repository";
import AuthUsecase from "../../../../feature/customer/auth/usecase/auth_usecase";
import CustomerModel from "../../../../feature/customer/auth/entity/customer_model";
import Validator from "../../../../feature/customer/auth/framework/joi/register_valid_user_validation";

const router = express.Router();

const customerRepository: CustomerRepository = new CustomerMongodb();
const authRepository: AuthRepository = new AuthFirebase();

const authUsecase: AuthUsecase = new AuthUsecase(
  customerRepository,
  authRepository
);

router.post("/", async (req: Request, res: Response) => {
  try {
    const { error } = Validator.validate(req.body);

    if (error != undefined) {
      throw new BadRequest(error.message);
    }

    const model: CustomerModel = {
      _id: req.body._id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: req.body.image,
      fcm: req.body.fcm,
    };

    const results = await authUsecase.registerValidUser(model);

    if (results == null) {
      throw new Unauthorized();
    }

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
