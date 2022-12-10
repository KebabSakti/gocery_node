import CustomerModel from "../model/customer_model";

abstract class AuthValidator {
  abstract access(customerModel: CustomerModel): void;
}

export default AuthValidator;
