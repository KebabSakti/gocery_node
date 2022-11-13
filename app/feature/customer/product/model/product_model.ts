export interface ProductModel {
  uid?: string;
  category_uid?: string;
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  point?: number;
  min?: number;
  max?: number;
  link?: string;
  unit_name?: string;
  unit_count?: number;
  discount_type?: string;
  discount_amount?: number;
  sold?: number;
  view?: number;
  favourite?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductViewModel {
  uid?: string;
  customer_uid?: string;
  product_uid?: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductOption {
  uid?: string;
  bundle_uid?: string;
  search?: string;
  category_uid?: string;
  cheapest?: string;
  discount?: string;
  point?: string;
  sold?: string;
  view?: string;
  favourite?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductFavouriteModel {
  uid?: string;
  customer_uid?: string;
  product_uid?: string;
  created_at?: string;
  updated_at?: string;
}
