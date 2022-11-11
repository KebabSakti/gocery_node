interface BundleItemModel {
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
  sold?: number;
  view?: number;
  favourite?: number;
}

export default BundleItemModel;
