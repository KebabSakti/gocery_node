import { model, Schema } from "mongoose";

export interface ViewModel {
  _id?: string;
  customer?: string;
  product?: string;
  hit?: number;
  created_at?: string;
  updated_at?: string;
}

export const ViewScheme = model<ViewModel>(
  "views",
  new Schema<ViewModel>({
    customer: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, required: true, ref: "products" },
    hit: { type: Number, default: 1 },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);
