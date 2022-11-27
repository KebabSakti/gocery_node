import AuthFirebase from "../../../feature/customer/auth/datasource/auth_firebase";
import { AuthRepository } from "../../../feature/customer/auth/repository/auth_repository";
import CustomerMongo from "../../../feature/customer/user/datasource/customer_mongo";
import CustomerRepository from "../../../feature/customer/user/repository/customer_repository";
import { Unauthorized } from "./../../config/errors";

const auth: AuthRepository = new AuthFirebase();
const customerRepository: CustomerRepository = new CustomerMongo();

const socketAuth = async (socket: any, next: any) => {
  try {
    const token = socket.handshake.auth.token;

    // const id = await auth.verify(token);

    const id = "sMQ6HEvkfZadQfbbae2Qlgj11IJ2";

    const customer = await customerRepository.show(id);

    if (customer == null) {
      next(new Unauthorized());
    }

    socket.data.user = id;

    next();
  } catch (_) {
    next(new Unauthorized());
  }
};

export default socketAuth;
