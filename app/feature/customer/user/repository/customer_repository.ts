import { CustomerModel } from "../model/customer_model";

abstract class CustomerRepository {
  abstract show(id: string): Promise<CustomerModel | null>;

  abstract update(customerModel: CustomerModel): Promise<void>;

  abstract store(customerModel: CustomerModel): Promise<void>;
}

export default CustomerRepository;
