interface OrderPayload {
  customer: string;
  point: boolean;
  clearCart?: boolean;
  payment: {
    _id: string;
    note?: string;
  };
  shipping?: {
    address: string;
    name: string;
    phone: string;
    time: string;
    destination: string;
    note?: string;
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
