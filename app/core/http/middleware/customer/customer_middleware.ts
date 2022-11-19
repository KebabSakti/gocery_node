import { NextFunction, Request, Response } from "express";
import AuthFirebase from "../../../../feature/customer/auth/datasource/auth_firebase";
import { AuthRepository } from "../../../../feature/customer/auth/repository/auth_repository";
import CustomerMongo from "../../../../feature/customer/user/datasource/customer_mongo";
import { CustomerModel } from "../../../../feature/customer/user/model/customer_model";
import CustomerRepository from "../../../../feature/customer/user/repository/customer_repository";
import { Unauthorized } from "../../../config/errors";
import ErrorHandler from "../../../service/error_handler";

const auth: AuthRepository = new AuthFirebase();
const customerRepository: CustomerRepository = new CustomerMongo();

async function customerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // const bearerHeader: string | undefined = req.get("authorization");

    // if (bearerHeader == undefined) {
    //   throw new Unauthorized("Bearer header not found");
    // }

    // const token = bearerHeader.split(" ")[1];

    // const id: string = await auth.verify(token);

    // let customer: CustomerModel | null = await customerRepository.show(id);

    // if (customer == null) {
    //   throw new Unauthorized();
    // }

    req.app.locals.user = "6378d3acfe558fd83d44500f";

    next();
  } catch (error) {
    new ErrorHandler(res, error);
  }
}

export default customerMiddleware;
