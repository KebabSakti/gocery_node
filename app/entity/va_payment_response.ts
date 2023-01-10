interface VaPaymentResponse {
  id: string;
  extId: string;
  status: string;
  bankCode: string;
  name: string;
  accountNumber: string;
  amount: number;
  expirationDate: string;
  raw: {
    charge_response: string;
    paid_response?: string;
  };
}

export default VaPaymentResponse;
