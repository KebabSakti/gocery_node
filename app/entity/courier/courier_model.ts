interface CourierModel {
  _id?: string;
  name?: string;
  phone?: string;
  image?: string;
  fcm?: string;
  email?: string;
  password?: string;
  online?: boolean;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export default CourierModel;
