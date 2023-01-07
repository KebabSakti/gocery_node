import Xendit from "xendit-node";
import EwalletPaymentRequest from "../../../entity/ewallet_payment_request";
import EwalletPaymentResponse from "../../../entity/ewallet_payment_response";
import QrPaymentRequest from "../../../entity/qr_payment_request";
import QrPaymentResponse from "../../../entity/qr_payment_response";
import RetailPaymentRequest from "../../../entity/retail_payment_request";
import RetailPaymentResponse from "../../../entity/retail_payment_response";
import VaPaymentRequest from "../../../entity/va_payment_request";
import VaPaymentResponse from "../../../entity/va_payment_response";
import PaymentGateway from "../../../port/service/customer/payment_gateway";

class PaymentGatewayXendit implements PaymentGateway {
  async makeVaPayment(model: VaPaymentRequest): Promise<VaPaymentResponse> {
    return new Promise<VaPaymentResponse>((resolve, reject) => {
      const { VirtualAcc } = new Xendit({
        secretKey: process.env.XENDIT_SECRET_KEY as string,
      });

      const vaSpecificOptions = {};
      const va = new VirtualAcc(vaSpecificOptions);

      va.createFixedVA({
        externalID: model.id,
        bankCode: model.bankCode,
        name: model.name,
        expectedAmt: model.amount!,
        isSingleUse: true,
        isClosed: true,
      })
        .then((response: any) => {
          const {
            status,
            external_id,
            id,
            name,
            bank_code,
            expected_amount,
            account_number,
            expiration_date,
          } = response;

          const result: VaPaymentResponse = {
            id: id,
            extId: external_id,
            name: name,
            bankCode: bank_code,
            accountNumber: account_number,
            amount: expected_amount,
            status: status,
            expirationDate: expiration_date,
          };

          resolve(result);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async makeRetailPayment(
    model: RetailPaymentRequest
  ): Promise<RetailPaymentResponse> {
    const { RetailOutlet } = new Xendit({
      secretKey: process.env.XENDIT_SECRET_KEY as string,
    });

    const retailOutletSpecificOptions = {};
    const ro = new RetailOutlet(retailOutletSpecificOptions);

    return new Promise<RetailPaymentResponse>((resolve, reject) => {
      ro.createFixedPaymentCode({
        externalID: model.id,
        retailOutletName: model.retailName,
        name: model.name,
        expectedAmt: model.amount,
      })
        .then((response: any) => {
          const {
            status,
            external_id,
            retail_outlet_name,
            name,
            payment_code,
            expected_amount,
            expiration_date,
            id,
          } = response;

          const results: RetailPaymentResponse = {
            amount: expected_amount,
            expirationDate: expiration_date,
            extId: external_id,
            id: id,
            name: name,
            paymentCode: payment_code,
            retailName: retail_outlet_name,
            status: status,
          };

          resolve(results);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async makeQrPayment(model: QrPaymentRequest): Promise<QrPaymentResponse> {
    throw new Error("Method not implemented.");
  }

  async makeEwalletPayment(
    model: EwalletPaymentRequest
  ): Promise<EwalletPaymentResponse> {
    throw new Error("Method not implemented.");
  }
}

export default PaymentGatewayXendit;
