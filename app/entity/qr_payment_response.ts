interface QrPaymentResponse {
  id: string;
  extId: string;
  qr: string;
  amount: number;
  status: string;
  created: string;
  updated: string;
  raw: {
    charge_response: string;
    paid_response?: string;
  };
}

export default QrPaymentResponse;
