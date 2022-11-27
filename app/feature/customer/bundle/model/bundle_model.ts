import { model, Schema } from "mongoose";

export interface BundleModel {
  _id?: string;
  name?: string;
  description?: string;
  image?: string;
  hidden?: boolean;
  active?: boolean;
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
    hidden: { type: Boolean, default: false },
    active: { type: Boolean, default: true, index: true },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
    products: [{ type: Schema.Types.ObjectId, ref: "products" }],
  })
);
