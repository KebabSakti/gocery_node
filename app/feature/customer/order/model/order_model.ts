import { model, Schema } from "mongoose";
import { OrderStatus, PaymentStatus } from "../config/order_enum";

export interface OrderModel {
  _id?: string;
  invoice: string;
  total: number;
  qty: number;
  status?: OrderStatus;
  courier?: {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
    image?: string;
  };
  customer: {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
    image?: string;
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
  payment: {
    _id: string;
    category: string;
    code: string;
    name: string;
    picture: string;
    fee: number;
    percentage: number;
    min: number;
    max: number;
    expire: string;
    status?: PaymentStatus;
  };
  items: OrderItemModel[];
  bills: { name: string; value: number }[];
  deductors: { name: string; value: number }[];
  created_at?: string;
  updated_at?: string;
}

export interface OrderItemModel {
  _id?: string;
  order?: string;
  product?: string;
  category: string;
  name: string;
  description?: string;
  image: string;
  point: number;
  min?: number;
  max?: number;
  link?: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  price: {
    base: number;
    discount: number;
    final: number;
  };
  unit: {
    name: string;
    symbol: string;
    count: number;
  };
  meta: {
    sold: number;
    view: number;
    favs: number;
  };
  note?: string;
  qty: number;
  total: number;
}

export const OrderItemScheme = model<OrderItemModel>(
  "order_items",
  new Schema<OrderItemModel>({
    _id: { type: Schema.Types.ObjectId, required: true },
    order: { type: String, required: true },
    product: { type: String, required: true },
    name: { type: String, required: true, index: true },
    description: { type: String },
    image: { type: String, required: true },
    point: { type: Number, default: 0 },
    min: { type: Number, default: null },
    max: { type: Number, default: null },
    link: { type: String, default: null },
    category: {
      type: String,
      required: true,
    },
    currency: {
      code: { type: String, required: true },
      name: { type: String, required: true },
      symbol: { type: String, required: true },
    },
    price: {
      base: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      final: { type: Number, required: true },
    },
    unit: {
      name: { type: String, required: true },
      symbol: { type: String, required: true },
      count: { type: Number, required: true },
    },
    meta: {
      sold: { type: Number, default: 0 },
      view: { type: Number, default: 0 },
      favs: { type: Number, default: 0 },
    },
    note: { type: String, default: null },
    qty: { type: Number, required: true },
    total: { type: Number, required: true },
  })
);

export const OrderScheme = model<OrderModel>(
  "orders",
  new Schema<OrderModel>({
    status: { type: String, default: null },
    qty: { type: Number, required: true },
    total: { type: Number, required: true },
    invoice: { type: String, required: true },
    courier: {
      default: null,
      type: {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, default: null },
        phone: { type: String, default: null },
        image: { type: String, default: null },
      },
    },
    customer: {
      required: true,
      type: {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, default: null },
        phone: { type: String, default: null },
        image: { type: String, default: null },
      },
    },
    shipping: {
      place_id: { type: String, default: null },
      address: { type: String, required: true },
      name: { type: String, required: true },
      phone: { type: String, required: true },
      note: { type: String, default: null },
    },
    delivery: {
      distance: { type: Number, required: true },
      unit: { type: String, required: true },
      time: { type: String, required: true },
      fee: { type: Number, required: true },
    },
    payment: {
      required: true,
      type: {
        _id: { type: String, required: true },
        category: { type: String, required: true },
        code: { type: String, required: true },
        name: { type: String, required: true },
        picture: { type: String, required: true },
        fee: { type: Number, required: true },
        percentage: { type: Number, required: true },
        min: { type: Number, required: true },
        max: { type: Number, required: true },
        expire: { type: String, required: true },
        status: { type: String, default: null },
      },
    },
    items: {
      required: true,
      type: [
        { type: Schema.Types.ObjectId, required: true, ref: "order_items" },
      ],
    },
    bills: {
      default: [],
      type: [
        {
          name: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
    },
    deductors: {
      default: [],
      type: [
        {
          name: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
    },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);
