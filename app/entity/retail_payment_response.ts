interface RetailPaymentResponse {
  id: string;
  extId: string;
  status: string;
  retailName: string;
  name: string;
  paymentCode: string;
  amount: number;
  expirationDate: string;
}

export default RetailPaymentResponse;
