import { Request, Response } from "express";
import ErrorHandler from "../../../../common/error/error_handler";
import { Unauthorized } from "../../../../common/error/exception";
import CustomerModel from "../../../../entity/customer/customer_model";
import CustomerUsecase from "../../../../port/interactor/customer/customer_usecase";
import CustomerMongodb from "../../../data/mongodb/customer/customer_mongodb";
import AuthJwt from "../../jwt/customer/auth_jwt";

class AuthHandler {
  private usecase = new CustomerUsecase(new AuthJwt(), new CustomerMongodb());

  async createUser(req: Request, res: Response) {
    try {
      const model: CustomerModel = {
        _id: req.body._id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.body.image,
        fcm: req.body.fcm,
      };

      const results = await this.usecase.store(model);

      if (results == null) {
        throw new Unauthorized();
      }

      res.json(results);
    } catch (error) {
      new ErrorHandler(res, error);
    }
  }
}

export default AuthHandler;
