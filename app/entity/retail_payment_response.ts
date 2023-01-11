interface RetailPaymentResponse {
  id: string;
  extId: string;
  status: string;
  retailName: string;
  name: string;
  paymentCode: string;
  amount: number;
  expirationDate: string;
  raw: {
    charge_response: string;
    paid_response?: string;
  };
}

export default RetailPaymentResponse;
