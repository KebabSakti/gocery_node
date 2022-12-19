interface PaymentModel {
  _id?: string;
  category?: string;
  code?: string;
  name?: string;
  picture?: string;
  fee?: number;
  percentage?: number;
  min?: number;
  max?: number;
  cash?: boolean;
  expire?: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export default PaymentModel;
