// import { NextFunction, Request, Response } from "express";
// import AuthFirebase from "../../../../feature/customer/auth/datasource/auth_firebase";
// import { AuthRepository } from "../../../../feature/customer/auth/repository/auth_repository";
// import CustomerMongo from "../../../../feature/customer/user/datasource/customer_mongo";
// import CustomerRepository from "../../../../feature/customer/user/repository/customer_repository";
// import { Unauthorized } from "../../../config/errors";
// import ErrorHandler from "../../../service/error_handler";

// const auth: AuthRepository = new AuthFirebase();
// const customerRepository: CustomerRepository = new CustomerMongo();

// async function customerMiddleware(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     // const bearerHeader: string | undefined = req.get("authorization");

//     // if (bearerHeader == undefined) {
//     //   throw new Unauthorized("Bearer header not found");
//     // }

//     // const token = bearerHeader.split(" ")[1];

//     // const id = await auth.verify(token);

//     // const customer = await customerRepository.show(id);

//     // if (customer == null) {
//     //   throw new Unauthorized();
//     // }

//     req.app.locals.user = "sMQ6HEvkfZadQfbbae2Qlgj11IJ2";

//     next();
//   } catch (error) {
//     new ErrorHandler(res, error);
//   }
// }

// export default customerMiddleware;
