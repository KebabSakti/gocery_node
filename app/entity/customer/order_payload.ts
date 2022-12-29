interface OrderPayload {
  customer: string;
  point: boolean;
  clearCart?: boolean;
  payment: {
    _id: string;
    note?: string;
  };
  shipping?: {
    place_id?: string;
    address: string;
    name: string;
    phone: string;
    note?: string;
  };
  delivery?: {
    time: string;
    destination: string;
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
