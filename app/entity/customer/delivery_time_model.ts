interface DeliveryTimeModel {
  _id: string;
  time: string;
  active: boolean;
  available?: boolean;
  created_at?: string;
  updated_at?: string;
}

export default DeliveryTimeModel;
