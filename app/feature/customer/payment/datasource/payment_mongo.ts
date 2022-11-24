import PagingOption from "../../../../core/model/paging_option";
import { PaymentModel } from "../model/payment_model";
import PaymentOption from "../model/payment_option";
import PaymentRepository from "../repository/payment_repository";

class PaymentMongo implements PaymentRepository {
  async index(
    option?: PaymentOption | undefined,
    paging?: PagingOption | undefined
  ): Promise<PaymentModel[]> {
    throw new Error("Method not implemented.");
  }

  async show(id: string): Promise<PaymentModel | null> {
    throw new Error("Method not implemented.");
  }
}

export default PaymentMongo;
