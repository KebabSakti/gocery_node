import { model, Schema } from "mongoose";

export interface CustomerModel {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
  point?: number;
  active?: number;
  created_at?: string;
  updated_at?: string;
}

export const CustomerScheme = model<CustomerModel>(
  "customers",
  new Schema<CustomerModel>({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, default: null },
    phone: { type: String, default: null },
    image: { type: String, default: null },
    point: { type: Number, default: 0 },
    active: { type: Number, default: 1 },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);
