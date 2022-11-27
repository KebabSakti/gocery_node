import { PaymentScheme } from "./../model/payment_model";
import mongoose from "mongoose";
import PagingOption from "../../../../core/model/paging_option";
import { PaymentModel } from "../model/payment_model";
import PaymentOption from "../model/payment_option";
import PaymentRepository from "../repository/payment_repository";

class PaymentMongo implements PaymentRepository {
  async index(
    option?: PaymentOption | undefined,
    paging?: PagingOption | undefined
  ): Promise<PaymentModel[]> {
    const query = PaymentScheme.find({ active: true }).select(
      "-active -created_at -updated_at -__v"
    );

    if (paging != undefined) {
      query.skip(paging.offset).limit(paging.limit);
    }

    const results = await query.exec();

    return results;
  }

  async show(id: string): Promise<PaymentModel | null> {
    let results = null;

    if (mongoose.isValidObjectId(id)) {
      results = await PaymentScheme.findById(id, { active: true }).select(
        "-active -created_at -updated_at -__v"
      );
    }

    return results;
  }
}

export default PaymentMongo;
