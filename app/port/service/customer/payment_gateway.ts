import EwalletPaymentResponse from "../../../entity/ewallet_payment_response";
import PaymentRequestModel from "../../../entity/payment_request_model";
import QrPaymentResponse from "../../../entity/qr_payment_response";
import RetailPaymentResponse from "../../../entity/retail_payment_response";
import VaPaymentResponse from "../../../entity/va_payment_response";

abstract class PaymentGateway {
  abstract makeVaPayment(
    model: PaymentRequestModel
  ): Promise<VaPaymentResponse>;

  abstract makeRetailPayment(
    model: PaymentRequestModel
  ): Promise<RetailPaymentResponse>;

  abstract makeQrPayment(
    model: PaymentRequestModel
  ): Promise<QrPaymentResponse>;

  abstract makeEwalletPayment(
    model: PaymentRequestModel
  ): Promise<EwalletPaymentResponse>;
}

export default PaymentGateway;
