interface BundleModel {
  _id?: string;
  name?: string;
  description?: string;
  image?: string;
  hidden?: boolean;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
  products?: string[];
}

export default BundleModel;
