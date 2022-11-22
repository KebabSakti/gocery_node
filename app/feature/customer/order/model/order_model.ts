import { model, Schema } from "mongoose";

export interface OrderModel {
  _id?: string;
  invoice: string;
  total: number;
  qty: number;
  courier?: {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
    image?: string;
  };
  customer: {
    _id: string;
    external_id: string;
    name: string;
    email?: string;
    phone?: string;
    image?: string;
  };
  shipping: {
    place_id?: string;
    address: string;
    name: string;
    phone: string;
    note?: string;
  };
  delivery: {
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
    status: string;
  };
  products: OrderItemModel[];
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItemModel {
  _id?: string;
  order?: string;
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
    _id: { type: String, required: true },
    order: { type: Schema.Types.ObjectId, required: true, ref: "orders" },
    category: {
      type: String,
      required: true,
    },
    name: { type: String, required: true, index: true },
    description: { type: String },
    image: { type: String, required: true },
    point: { type: Number, default: 0 },
    min: { type: Number },
    max: { type: Number },
    link: { type: String },
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
    note: { type: String },
    qty: { type: Number, required: true },
    total: { type: Number, required: true },
  })
);

export const OrderScheme = model<OrderModel>(
  "orders",
  new Schema<OrderModel>({
    invoice: { type: String, required: true },
    qty: { type: Number, required: true },
    total: { type: Number, required: true },
    courier: {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String },
      phone: { type: String },
      image: { type: String },
    },
    customer: {
      required: true,
      type: {
        _id: { type: String, required: true },
        external_id: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String },
        phone: { type: String },
        image: { type: String },
      },
    },
    shipping: {
      required: true,
      type: {
        place_id: { type: String },
        address: { type: String, required: true },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        note: { type: String },
      },
    },
    delivery: {
      required: true,
      type: {
        distance: { type: Number, required: true },
        unit: { type: String, required: true },
        time: { type: String, required: true },
        fee: { type: Number, required: true },
      },
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
        status: { type: String, required: true },
      },
    },
    products: {
      required: true,
      type: [
        { type: Schema.Types.ObjectId, required: true, ref: "order_items" },
      ],
    },
    status: { type: String, required: true },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);
