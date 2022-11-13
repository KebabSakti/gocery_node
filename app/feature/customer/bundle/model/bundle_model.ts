export interface BundleModel {
  uid?: string;
  name?: string;
  description?: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BundleItemModel {
  uid?: string;
  bundle_uid?: string;
  product_uid?: string;
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
  created_at?: string;
  updated_at?: string;
}

export interface BundleWithItemModel {
  bundle: BundleModel;
  bundle_items: BundleItemModel[];
}
