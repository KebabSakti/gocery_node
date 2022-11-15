export interface OrderModel {
  uid?: string;
  invoice?: string;
  pay?: number;
  customer?: OrderCustomerModel;
  partner?: OrderPartnerModel;
  payment?: OrderPaymentModel;
  shipping?: OrderShippingModel;
  voucher?: OrderVoucherModel;
  status?: OrderStatusModel;
  products?: OrderPartnerModel[];
  created_at?: string;
  updated_at?: string;
}

export interface OrderCustomerModel {
  uid?: string;
  order_uid?: string;
  customer_uid?: string;
  name?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OrderPartnerModel {
  uid?: string;
  order_uid?: string;
  partner_uid?: string;
  name?: string;
  email?: string;
  partner_fee?: number;
  app_fee?: number;
  total_fee?: number;
  status?: string;
  note?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OrderPaymentModel {
  uid?: string;
  order_uid?: string;
  payment_uid?: string;
  status?: string;
  extra?: string;
  note?: number;
  provider_name?: string;
  category?: string;
  currency?: string;
  name?: string;
  fee?: number;
  created_at?: string;
  updated_at?: string;
}

export interface OrderProductsModel {
  uid?: string;
  order_uid?: string;
  category?: string;
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
  note?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OrderShippingModel {
  uid?: string;
  order_uid?: string;
  name?: string;
  phone?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
  place?: string;
  distance?: number;
  unit?: string;
  note?: string;
  fee?: number;
  place_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OrderStatusModel {
  uid?: string;
  order_uid?: string;
  status?: string;
  note?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OrderVoucherModel {
  uid?: string;
  order_uid?: string;
  code?: string;
  name?: string;
  description?: string;
  amount?: number;
  expired_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OrderOption {
  order_uid?: string;
  invoice?: string;
}
