import CustomerModel from "../../../../entity/customer/customer_model";
import CustomerContract from "../../../../port/repository/customer/customer_contract";
import CustomerScheme from "./customer_scheme";

class CustomerMongodb implements CustomerContract {
  async show(_id: string): Promise<CustomerModel | null> {
    const results = await CustomerScheme.findOne({
      _id: _id,
      active: true,
    }).select("-active -created_at -updated_at -__v");

    return results;
  }

  async update(customerModel: CustomerModel): Promise<void> {
    await CustomerScheme.findOneAndUpdate(
      { _id: customerModel._id },
      {
        _id: customerModel._id,
        name: customerModel.name,
        email: customerModel.email,
        phone: customerModel.phone,
        image: customerModel.image,
        updated_at: Date.now(),
      }
    );
  }

  async store(customerModel: CustomerModel): Promise<void> {
    await CustomerScheme.create(customerModel);
  }
}

export default CustomerMongodb;
