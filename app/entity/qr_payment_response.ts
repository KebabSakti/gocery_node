interface QrPaymentResponse {
  id: string;
  extId: string;
  qr: string;
  amount: number;
  status: string;
  created: string;
  updated: string;
}

export default QrPaymentResponse;
