interface CustomerModel {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
  point?: number;
  fcm?: string;
  online?: boolean;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export default CustomerModel;
