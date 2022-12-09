import { model, Schema } from "mongoose";
import CategoryModel from "../../entity/model/category_model";

const CategoryScheme = model<CategoryModel>(
  "categories",
  new Schema<CategoryModel>({
    name: { type: String, required: true, index: true },
    image: { type: String, required: true },
    active: { type: Boolean, default: true, index: true },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);

export default CategoryScheme;
