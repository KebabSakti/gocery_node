import { OrderStatus, PaymentStatus } from "./order_enum";
import OrderItemModel from "./order_item_model";

interface OrderModel {
  _id?: string;
  invoice?: string;
  total?: number;
  qty?: number;
  point?: number;
  status?: OrderStatus;
  courier?: {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
    image?: string;
  };
  customer?: {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
    image?: string;
    point?: number;
  };
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
  payment?: {
    _id: string;
    category: string;
    code: string;
    name: string;
    picture: string;
    fee: number;
    percentage: number;
    min: number;
    max: number;
    cash?: boolean;
    expire: string;
    status?: PaymentStatus;
  };
  items?: OrderItemModel[];
  bills?: { name: string; value: number }[];
  deductors?: { name: string; value: number }[];
  created_at?: string;
  updated_at?: string;
}

export default OrderModel;
