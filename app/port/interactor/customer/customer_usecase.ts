import CustomerModel from "../../../entity/customer/customer_model";
import AuthContract from "../../repository/customer/auth_contract";
import CustomerContract from "../../repository/customer/customer_contract";

class CustomerUsecase<T, S> {
  private authService: AuthContract<T, S>;
  private customerRepository: CustomerContract;

  constructor(
    authService: AuthContract<T, S>,
    customerRepository: CustomerContract
  ) {
    this.authService = authService;
    this.customerRepository = customerRepository;
  }

  async store(customerModel: CustomerModel): Promise<S> {
    let customer = await this.customerRepository.show(customerModel._id!);

    if (customer == null) {
      await this.customerRepository.store(customerModel);

      customer = await this.customerRepository.show(customerModel._id!);
    }

    const token = this.authService.access(customer!._id!);

    return token;
  }
}

export default CustomerUsecase;
