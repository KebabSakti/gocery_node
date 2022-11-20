import { model, Schema } from "mongoose";

export interface SearchModel {
  _id?: string;
  customer?: string;
  keyword?: string;
  created_at?: string;
  updated_at?: string;
}

export const SearchScheme = model<SearchModel>(
  "searches",
  new Schema<SearchModel>({
    customer: { type: Schema.Types.ObjectId, required: true, ref: "customers" },
    keyword: { type: String, required: true },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);
