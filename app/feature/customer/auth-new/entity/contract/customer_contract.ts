import CustomerModel from "../model/customer_model";

abstract class CustomerContract {
  abstract show(_id: string): Promise<CustomerModel | null>;

  abstract update(customerModel: CustomerModel): Promise<void>;

  abstract store(customerModel: CustomerModel): Promise<void>;
}

export default CustomerContract;
