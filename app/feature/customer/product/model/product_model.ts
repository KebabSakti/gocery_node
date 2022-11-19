import { model, Schema } from "mongoose";

export interface ProductModel {
  _id?: string;
  category?: string;
  name?: string;
  description?: string;
  image?: string;
  point?: number;
  min?: number;
  max?: number;
  link?: string;
  active?: number;
  created_at?: string;
  updated_at?: string;
  currency?: {
    code: string;
    name: string;
    symbol: string;
  };
  price?: {
    base: number;
    discount: number;
    final: number;
  };
  unit?: {
    name: string;
    symbol: string;
    count: number;
  };
  meta?: {
    sold: number;
    view: number;
    favs: number;
  };
}

export const ProductScheme = model<ProductModel>(
  "products",
  new Schema<ProductModel>({
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "categories",
    },
    name: { type: String, required: true, index: true },
    description: { type: String },
    image: { type: String, required: true },
    point: { type: Number, default: 0 },
    min: { type: Number },
    max: { type: Number },
    link: { type: String },
    active: { type: Number, default: 1, index: true },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
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
  })
);
