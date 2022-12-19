import PaymentModel from "../../../entity/customer/payment_model";
import PaymentOption from "../../../entity/customer/payment_option";

abstract class PaymentContract {
  abstract index(option?: PaymentOption): Promise<PaymentModel[]>;

  abstract show(id: string): Promise<PaymentModel | null>;
}

export default PaymentContract;
