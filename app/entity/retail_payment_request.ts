import { RetailCode } from "./payment_gateway_enum";

interface RetailPaymentRequest {
  id: string;
  retailName: RetailCode;
  name: string;
  amount: number;
}

export default RetailPaymentRequest;
