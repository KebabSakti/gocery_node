interface PaymentRequestModel {
  id: string;
  amount: number;
  code?: string;
  name?: string;
  phone?: string;
}

export default PaymentRequestModel;
