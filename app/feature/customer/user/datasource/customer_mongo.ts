import { CustomerModel, CustomerScheme } from "../model/customer_model";
import CustomerRepository from "../repository/customer_repository";

class CustomerMongo implements CustomerRepository {
  async show(id: string): Promise<CustomerModel | null> {
    const results = await CustomerScheme.findById(id).select(
      "-active -created_at -updated_at -__v"
    );

    return results;
  }

  async update(customerModel: CustomerModel): Promise<void> {
    await CustomerScheme.findByIdAndUpdate(customerModel._id, {
      name: customerModel.name,
      email: customerModel.email,
      phone: customerModel.phone,
      image: customerModel.image,
      updated_at: Date.now(),
    });
  }

  async store(customerModel: CustomerModel): Promise<void> {
    await CustomerScheme.create(customerModel);
  }
}

export default CustomerMongo;
