export interface CartModel {
  uid?: string;
  customer_uid?: string;
  total?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CartItemModel {
  uid?: string;
  cart_uid?: string;
  product_uid?: string;
  category_uid?: string;
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  final_price?: number;
  point?: number;
  min?: number;
  max?: number;
  link?: string;
  unit_name?: string;
  unit_count?: number;
  discount_type?: string;
  discount_amount?: number;
  qty?: number;
  total?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CartWithItemModel {
  cart: CartModel;
  cart_items: CartItemModel[];
}
