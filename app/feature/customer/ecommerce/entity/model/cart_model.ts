interface CartModel {
  _id?: string;
  customer: string;
  total: number;
  qty: number;
  items?: {
    product: string;
    qty: number;
    total: number;
  }[];
  created_at?: string;
  updated_at?: string;
}

export default CartModel;
