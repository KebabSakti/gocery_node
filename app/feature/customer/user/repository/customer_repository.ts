import CustomerModel from "../model/customer_model";

abstract class CustomerRepository {
  abstract show(uid: string): Promise<CustomerModel | null>;

  abstract update(customer: CustomerModel): Promise<void>;

  abstract store(customer: CustomerModel): Promise<void>;
}

export default CustomerRepository;
