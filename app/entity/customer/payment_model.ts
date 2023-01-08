interface PaymentModel {
  _id?: string;
  vendor?: string;
  category?: string;
  code?: string;
  name?: string;
  picture?: string;
  note?: string;
  fee?: number;
  percentage?: number;
  min?: number;
  max?: number;
  cash?: boolean;
  expire?: number;
  help?: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export default PaymentModel;
