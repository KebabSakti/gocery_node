interface EwalletPaymentRequest {
  id: string;
  amount: number;
  channelCode: string;
  note: string;
}

export default EwalletPaymentRequest;
