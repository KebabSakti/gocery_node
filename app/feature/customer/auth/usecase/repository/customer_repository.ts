import CustomerModel from "../../entity/customer_model";

abstract class CustomerRepository {
  abstract show(_id: string): Promise<CustomerModel | null>;

  abstract update(customerModel: CustomerModel): Promise<void>;

  abstract store(customerModel: CustomerModel): Promise<void>;
}

export default CustomerRepository;
