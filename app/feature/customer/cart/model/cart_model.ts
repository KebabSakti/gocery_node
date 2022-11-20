import { model, Schema } from "mongoose";

export interface CartModel {
  _id?: string;
  customer?: string;
  total?: number;
  qty?: number;
  items: {
    product: string;
    qty: number;
    total: number;
  }[];
  created_at?: string;
  updated_at?: string;
}

export const CartScheme = model<CartModel>(
  "carts",
  new Schema<CartModel>({
    customer: { type: Schema.Types.ObjectId, ref: "customers" },
    qty: { type: Number, required: true },
    total: { type: Number, required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "products" },
        qty: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);
