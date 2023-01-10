interface EwalletPaymentResponse {
  id: string;
  extId: string;
  status: string;
  note: string;
  channel: string;
  created: string;
  updated: string;
  raw: {
    charge_response: string;
    paid_response?: string;
  };
}

export default EwalletPaymentResponse;
