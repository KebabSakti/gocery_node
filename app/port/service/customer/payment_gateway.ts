import EwalletPaymentRequest from "../../../entity/ewallet_payment_request";
import EwalletPaymentResponse from "../../../entity/ewallet_payment_response";
import QrPaymentRequest from "../../../entity/qr_payment_request";
import QrPaymentResponse from "../../../entity/qr_payment_response";
import RetailPaymentRequest from "../../../entity/retail_payment_request";
import RetailPaymentResponse from "../../../entity/retail_payment_response";
import VaPaymentRequest from "../../../entity/va_payment_request";
import VaPaymentResponse from "../../../entity/va_payment_response";

abstract class PaymentGateway {
  abstract makeVaPayment(model: VaPaymentRequest): Promise<VaPaymentResponse>;

  abstract makeRetailPayment(
    model: RetailPaymentRequest
  ): Promise<RetailPaymentResponse>;

  abstract makeQrPayment(model: QrPaymentRequest): Promise<QrPaymentResponse>;

  abstract makeEwalletPayment(
    model: EwalletPaymentRequest
  ): Promise<EwalletPaymentResponse>;
}

export default PaymentGateway;
