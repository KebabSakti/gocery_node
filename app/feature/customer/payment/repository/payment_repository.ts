import PagingOption from "../../../../core/model/paging_option";
import { PaymentModel } from "../model/payment_model";
import PaymentOption from "../model/payment_option";

abstract class PaymentRepository {
  abstract index(
    option?: PaymentOption,
    paging?: PagingOption
  ): Promise<PaymentModel[]>;

  abstract show(id: string): Promise<PaymentModel | null>;
}

export default PaymentRepository;
