import { Request, Response } from "express";
import ErrorHandler from "../../../../common/error/error_handler";
import { Unauthorized } from "../../../../common/error/exception";
import CustomerModel from "../../../../entity/customer/customer_model";
import CustomerUsecase from "../../../../port/interactor/customer/customer_usecase";
import CustomerMongodb from "../../../data/mongodb/customer/customer_mongodb";
import AuthJwt from "../../jwt/customer/auth_jwt";

const usecase = new CustomerUsecase(new AuthJwt(), new CustomerMongodb());

class CustomerHandler {
  async createUser(req: Request, res: Response) {
    try {
      const { _id, name, email, phone, image, fcm } = req.body;

      const model: CustomerModel = {
        _id: _id,
        name: name,
        email: email,
        phone: phone,
        image: image,
        fcm: fcm,
      };

      const results = await usecase.store(model);

      if (results == null) {
        throw new Unauthorized();
      }

      res.json(results);
    } catch (error) {
      new ErrorHandler(res, error);
    }
  }
}

export default CustomerHandler;
