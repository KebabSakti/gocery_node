import CustomerModel from "../model/customer_model";

abstract class CustomerRepository {
  abstract getUser(uid: string): Promise<CustomerModel | null>;

  abstract updateUser(customer: CustomerModel): Promise<void>;

  abstract insertUser(customer: CustomerModel): Promise<void>;
}

export default CustomerRepository;
