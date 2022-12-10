import CustomerModel from "../entity/model/customer_model";
import AuthContract from "../entity/contract/auth_contract";
import CustomerContract from "../entity/contract/customer_contract";
import AuthValidator from "../entity/validator/auth_validator";

class AuthUsecase {
  private repository: CustomerContract;
  private auth: AuthContract;
  private validator: AuthValidator;

  constructor(
    repository: CustomerContract,
    auth: AuthContract,
    validator: AuthValidator
  ) {
    this.repository = repository;
    this.auth = auth;
    this.validator = validator;
  }

  async verify(token: string): Promise<string | null> {
    return await this.auth.verify(token);
  }

  async access(customerModel: CustomerModel): Promise<string | null> {
    this.validator.access(customerModel);

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
