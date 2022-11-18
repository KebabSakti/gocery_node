import { model, Schema } from "mongoose";

export interface CategoryModel {
  _id?: string;
  name?: string;
  image?: string;
  active?: number;
  created_at?: string;
  updated_at?: string;
}

export const CategoryScheme = model<CategoryModel>(
  "categories",
  new Schema<CategoryModel>({
    name: { type: String, required: true },
    image: { type: String, required: true },
    active: { type: Number, default: 1 },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);
