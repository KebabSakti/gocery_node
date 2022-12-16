interface OrderPayload {
  customer: string;
  point: boolean;
  payment: string;
  shipping?: {
    place_id?: string;
    address: string;
    name: string;
    phone: string;
    note?: string;
  };
  delivery?: {
    distance: number;
    unit: string;
    time: string;
    fee: number;
  };
  items: {
    product: string;
    qty: number;
  }[];
}

export default OrderPayload;
