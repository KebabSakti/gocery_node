import { ResourceNotFound } from "../../../common/error/exception";
import PaymentModel from "../../../entity/customer/payment_model";
import PaymentOption from "../../../entity/customer/payment_option";
import UpdatePaymentModel from "../../../entity/customer/update_payment_model";
import OrderContract from "../../repository/customer/order_contract";
import PaymentContract from "../../repository/customer/payment_contract";

class PaymentUsecase {
  private paymentRepository: PaymentContract;
  private orderRepository: OrderContract;

  constructor(
    paymentRepository: PaymentContract,
    orderRepository: OrderContract
  ) {
    this.paymentRepository = paymentRepository;
    this.orderRepository = orderRepository;
  }

  async getAllPaymentMethods(option?: PaymentOption): Promise<PaymentModel[]> {
    return await this.paymentRepository.index(option);
  }

  async getPaymentDetailById(id: string): Promise<PaymentModel | null> {
    return await this.paymentRepository.show(id);
  }

  async createPayment(category: string): Promise<void> {}

  async updatePayment(
    orderId: string,
    payload: UpdatePaymentModel
  ): Promise<void> {
    switch (payload.category) {
      case "va":
        if (payload.status == "paid") {
          //payment complete
        }
        break;

      case "retail":
        if (payload.status == "paid") {
          //payment complete
        }
        break;

      case "qr":
        break;

      case "ewallet":
        //
        break;

      default:
        throw new ResourceNotFound("Payment method not found");
    }
  }
}

export default PaymentUsecase;
