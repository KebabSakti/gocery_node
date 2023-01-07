interface VaPaymentRequest {
  id: string;
  bankCode: string;
  name: string;
  amount?: number;
}

export default VaPaymentRequest;
