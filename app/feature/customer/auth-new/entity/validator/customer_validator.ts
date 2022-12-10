import CustomerModel from "../model/customer_model";

abstract class CustomerValidator {
  abstract store(customerModel: CustomerModel): void;
}

export default CustomerValidator;
