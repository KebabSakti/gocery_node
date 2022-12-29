import mongoose from "mongoose";
import PaymentModel from "../../../../entity/customer/payment_model";
import PaymentOption from "../../../../entity/customer/payment_option";
import PaymentScheme from "../../../../entity/customer/payment_scheme";
import PaymentContract from "../../../../port/repository/customer/payment_contract";

class PaymentMongodb implements PaymentContract {
  async index(option?: PaymentOption | undefined): Promise<PaymentModel[]> {
    const query = PaymentScheme.find({ active: true })
      .select("-active -created_at -updated_at -__v")
      .lean();

    if (option != undefined) {
      if (option.pagination != undefined) {
        query.skip(option.pagination.offset).limit(option.pagination.limit);
      }
    }

    const results = await query.exec();

    return results;
  }

  async show(id: string): Promise<PaymentModel | null> {
    let results = null;

    if (mongoose.isValidObjectId(id)) {
      results = await PaymentScheme.findOne({ _id: id, active: true })
        .select("-active -created_at -updated_at -__v")
        .lean();
    }

    return results;
  }
}

export default PaymentMongodb;
