import AuthContract from "../entity/contract/auth_contract";
import CustomerContract from "../entity/contract/customer_contract";
import CustomerModel from "../entity/model/customer_model";
import CustomerValidator from "../entity/validator/customer_validator";

class CustomerUsecase<T, S> {
  private authRepository: AuthContract<T, S>;
  private customerRepository: CustomerContract;
  private customerValidator: CustomerValidator;

  constructor(
    authRepository: AuthContract<T, S>,
    customerRepository: CustomerContract,
    customerValidator: CustomerValidator
  ) {
    this.authRepository = authRepository;
    this.customerRepository = customerRepository;
    this.customerValidator = customerValidator;
  }

  async store(customerModel: CustomerModel): Promise<S> {
    this.customerValidator.store(customerModel);

    let customer = await this.customerRepository.show(customerModel._id!);

    if (customer == null) {
      await this.customerRepository.store(customerModel);

      customer = await this.customerRepository.show(customerModel._id!);
    }

    const token = this.authRepository.access(customer!._id!);

    return token;
  }
}

export default CustomerUsecase;
