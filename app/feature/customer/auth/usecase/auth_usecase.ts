import CustomerModel from "../entity/customer_model";
import AuthRepository from "./repository/auth_repository";
import CustomerRepository from "./repository/customer_repository";

class AuthUsecase {
  private repository: CustomerRepository;
  private auth: AuthRepository;

  constructor(repository: CustomerRepository, auth: AuthRepository) {
    this.repository = repository;
    this.auth = auth;
  }

  async checkIfTokenIsValid(token: string): Promise<boolean> {
    const id = await this.auth.show(token);

    if (id != null) {
      return true;
    }

    return false;
  }

  async registerValidUser(
    customerModel: CustomerModel
  ): Promise<CustomerModel | null> {
    let customer = await this.repository.show(customerModel._id!);

    if (customer == null) {
      await this.repository.store(customerModel);

      customer = await this.repository.show(customerModel._id!);
    }

    return customer;
  }
}

export default AuthUsecase;
