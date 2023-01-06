import BillModel from "./bill_model";
import { OrderStatus, PaymentStatus } from "./order_enum";
import OrderItemModel from "./order_item_model";

interface OrderModel {
  _id?: string;
  invoice?: string;
  total?: number;
  qty?: number;
  point?: number;
  clearCart?: boolean;
  status?: { detail: OrderStatus; created_at?: string; updated_at?: string }[];
  courier?: {
    _id: string;
    name: string;
    fcm: string;
    email?: string;
    phone?: string;
    image?: string;
  };
  customer?: {
    _id: string;
    name: string;
    fcm: string;
    email?: string;
    phone?: string;
    image?: string;
    point?: number;
  };
  shipping?: {
    fee: number;
    origin: {
      placeId: string;
      latLng: string;
    };
    destination: {
      place: string;
      address: string;
      name: string;
      phone: string;
      distance: string;
      duration: string;
      note?: string;
    };
    schedule: {
      timeId: string;
      time: string;
    };
    meta: {
      distance: number;
      duration: number;
    };
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
    info: string;
    cash: boolean;
    expire?: string;
    note?: string;
    status?: {
      detail: PaymentStatus;
      created_at?: string;
      updated_at?: string;
    }[];
    help?: string;
  };
  items?: OrderItemModel[];
  bills?: BillModel[];
  deductors?: BillModel[];
  created_at?: string;
  updated_at?: string;
}

export default OrderModel;
