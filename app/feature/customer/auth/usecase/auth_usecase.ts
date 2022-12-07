import CustomerModel from "../entity/customer_model";
import AuthContract from "./contract/auth_contract";
import CustomerContract from "./contract/customer_contract";

class AuthUsecase {
  private repository: CustomerContract;
  private auth: AuthContract;

  constructor(repository: CustomerContract, auth: AuthContract) {
    this.repository = repository;
    this.auth = auth;
  }

  async verify(token: string): Promise<string | null> {
    return await this.auth.verify(token);
  }

  async access(customerModel: CustomerModel): Promise<string | null> {
    let customer = await this.repository.show(customerModel._id!);

    if (customer == null) {
      await this.repository.store(customerModel);

      customer = await this.repository.show(customerModel._id!);
    }

    const token = this.auth.access(customer!._id!);

    return token;
  }
}

export default AuthUsecase;
