interface VaPaymentResponse {
  id: string;
  extId: string;
  status: string;
  bankCode: string;
  name: string;
  accountNumber: string;
  amount: number;
  expirationDate: string;
}

export default VaPaymentResponse;
