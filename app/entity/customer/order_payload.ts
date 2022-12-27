interface OrderPayload {
  customer: string;
  point: boolean;
  payment: string;
  clearCart?: boolean;
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
    _id: string;
    qty: number;
  }[];
  bills: {
    _id: string;
    selected: boolean;
  }[];
  deductors: {
    _id: string;
    selected: boolean;
  }[];
}

export default OrderPayload;
