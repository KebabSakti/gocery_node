import { EwalletCode } from "./payment_gateway_enum";

interface EwalletPaymentRequest {
  id: string;
  amount: number;
  channelCode: EwalletCode;
  note?: string;
}

export default EwalletPaymentRequest;
