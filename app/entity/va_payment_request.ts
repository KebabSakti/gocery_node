import { VaBankCode } from "./payment_gateway_enum";

interface VaPaymentRequest {
  id: string;
  bankCode: VaBankCode;
  name: string;
  amount?: number;
}

export default VaPaymentRequest;
