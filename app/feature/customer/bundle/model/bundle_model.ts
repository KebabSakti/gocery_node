import { model, Schema } from "mongoose";

export interface BundleModel {
  _id?: string;
  name?: string;
  description?: string;
  image?: string;
  hidden?: number;
  active?: number;
  created_at?: string;
  updated_at?: string;
  products?: string[];
}

export const BundleScheme = model<BundleModel>(
  "bundles",
  new Schema<BundleModel>({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    hidden: { type: Number, default: 0 },
    active: { type: Number, default: 1, index: true },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
    products: [{ type: Schema.Types.ObjectId, ref: "products" }],
  })
);
