import { model, Schema } from "mongoose";

export interface CustomerModel {
  _id?: string;
  external_id?: string;
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
  searches?: string[];
  views?: string[];
  favourites?: string[];
  active?: number;
  created_at?: string;
  updated_at?: string;
}

export const CustomerScheme = model<CustomerModel>(
  "customers",
  new Schema<CustomerModel>({
    external_id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, default: null },
    phone: { type: String, default: null },
    image: { type: String, default: null },
    searches: [{ keyword: { type: String } }],
    views: [{ type: Schema.Types.ObjectId, ref: "products" }],
    favourites: [{ type: Schema.Types.ObjectId, ref: "products" }],
    active: { type: Number, default: 1 },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);
