import PaymentModel from "../../../entity/customer/payment_model";
import PaymentOption from "../../../entity/customer/payment_option";
import PaymentContract from "../../repository/customer/payment_contract";

class PaymentUsecase {
  private paymentRepository: PaymentContract;

  constructor(paymentRepository: PaymentContract) {
    this.paymentRepository = paymentRepository;
  }

  async getAllPaymentMethods(option?: PaymentOption): Promise<PaymentModel[]> {
    return await this.paymentRepository.index(option);
  }

  async getPaymentDetailById(id: string): Promise<PaymentModel | null> {
    return await this.paymentRepository.show(id);
  }
}

export default PaymentUsecase;
