import express, { Request, Response } from "express";
import { Unauthorized } from "../../../../../core/config/errors";
import ErrorHandler from "../../../../../core/service/error_handler";
import CustomerModel from "../../../../../entity/customer/customer_model";
import CustomerUsecase from "../../../../../port/interactor/customer/customer_usecase";
import CustomerMongodb from "../../../../data/mongodb/customer/customer_mongodb";
import AuthJwt from "../../../jwt/customer/auth_jwt";

const router = express.Router();

const usecase = new CustomerUsecase(new AuthJwt(), new CustomerMongodb());

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
