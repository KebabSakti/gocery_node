import Xendit from "xendit-node";
import { BadRequest } from "../../../common/error/exception";
import EwalletPaymentResponse from "../../../entity/ewallet_payment_response";
import PaymentRequestModel from "../../../entity/payment_request_model";
import QrPaymentResponse from "../../../entity/qr_payment_response";
import RetailPaymentResponse from "../../../entity/retail_payment_response";
import VaPaymentResponse from "../../../entity/va_payment_response";
import PaymentGateway from "../../../port/service/customer/payment_gateway";

class PaymentGatewayXendit implements PaymentGateway {
  makeVaPayment(model: PaymentRequestModel): Promise<VaPaymentResponse> {
    if (model.code == undefined) {
      throw new BadRequest("Bank code cannot be empty");
    }

    return new Promise<VaPaymentResponse>((resolve, reject) => {
      const { VirtualAcc } = new Xendit({
        secretKey: process.env.XENDIT_SECRET_KEY as string,
      });

      const vaSpecificOptions = {};
      const va = new VirtualAcc(vaSpecificOptions);

      va.createFixedVA({
        externalID: model.id,
        bankCode: model.code!,
        name: "Gocery",
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
            raw: {
              charge_response: JSON.stringify(response),
            },
          };

          resolve(result);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  makeRetailPayment(
    model: PaymentRequestModel
  ): Promise<RetailPaymentResponse> {
    if (model.name == undefined || model.code == undefined) {
      throw new BadRequest("Retail code and customer name cannot be empty");
    }

    const { RetailOutlet } = new Xendit({
      secretKey: process.env.XENDIT_SECRET_KEY as string,
    });

    const retailOutletSpecificOptions = {};
    const ro = new RetailOutlet(retailOutletSpecificOptions);

    return new Promise<RetailPaymentResponse>((resolve, reject) => {
      ro.createFixedPaymentCode({
        externalID: model.id,
        retailOutletName: model.code!,
        name: model.name!,
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
            id: id,
            extId: external_id,
            paymentCode: payment_code,
            name: name,
            amount: expected_amount,
            retailName: retail_outlet_name,
            status: status,
            expirationDate: expiration_date,
          };

          resolve(results);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  makeQrPayment(model: PaymentRequestModel): Promise<QrPaymentResponse> {
    const { QrCode } = new Xendit({
      secretKey: process.env.XENDIT_SECRET_KEY as string,
    });

    const qrcodeSpecificOptions = {};
    const qr = new QrCode(qrcodeSpecificOptions);

    return new Promise<QrPaymentResponse>((resolve, reject) => {
      qr.createCode({
        externalID: model.id,
        amount: model.amount,
        type: QrCode.Type.Dynamic,
        callbackURL: process.env.XENDIT_QR_CALLBACK_URL as string,
      })
        .then((response: any) => {
          const {
            id,
            external_id,
            amount,
            qr_string,
            status,
            created,
            updated,
          } = response;

          const results: QrPaymentResponse = {
            id: id,
            extId: external_id,
            amount: amount,
            qr: qr_string,
            status: status,
            created: created,
            updated: updated,
          };

          resolve(results);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  makeEwalletPayment(
    model: PaymentRequestModel
  ): Promise<EwalletPaymentResponse> {
    if (model.code == undefined) {
      throw new BadRequest("Ewallet code cannot be empty");
    }

    const { EWallet } = new Xendit({
      secretKey: process.env.XENDIT_SECRET_KEY as string,
    });

    const ewalletSpecificOptions = {};
    const ew = new EWallet(ewalletSpecificOptions);

    let channelProps = {};

    if (model.code == "ID_OVO") {
      if (model.phone == undefined) {
        throw new BadRequest("OVO phone number cannot be empty");
      }

      channelProps = { mobileNumber: model.phone };
    }

    if (
      model.code == "ID_DANA" ||
      model.code == "ID_LINKAJA" ||
      model.code == "ID_SHOPEEPAY"
    ) {
      channelProps = {
        successRedirectURL: process.env.XENDIT_EWALLET_SUCCESS_CALLBACK_URL,
      };
    }

    return new Promise<EwalletPaymentResponse>((resolve, reject) => {
      ew.createEWalletCharge({
        referenceID: model.id,
        amount: model.amount,
        currency: "IDR",
        channelCode: model.code!,
        checkoutMethod: "ONE_TIME_PAYMENT",
        channelProperties: channelProps,
      })
        .then((response: any) => {
          const {
            id,
            reference_id,
            status,
            channel_properties,
            channel_code,
            actions,
            created,
            updated,
          } = response;

          const note =
            channel_properties.mobile_number ??
            actions.desktop_web_checkout_url ??
            actions.mobile_web_checkout_url ??
            actions.mobile_deeplink_checkout_url ??
            actions.qr_checkout_string;

          const results: EwalletPaymentResponse = {
            id: id,
            extId: reference_id,
            status: status,
            note: note,
            channel: channel_code,
            created: created,
            updated: updated,
            raw: {
              charge_response: JSON.stringify(response),
            },
          };

          resolve(results);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

export default PaymentGatewayXendit;
