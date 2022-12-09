import { model, Schema } from "mongoose";
import ProductModel from "../../entity/model/product_model";

const ProductScheme = model<ProductModel>(
  "products",
  new Schema<ProductModel>({
    category: {
      type: String,
      required: true,
      index: true,
    },
    name: { type: String, required: true, index: true },
    description: { type: String },
    image: { type: String, required: true },
    point: { type: Number, default: 0 },
    min: { type: Number },
    max: { type: Number },
    link: { type: String },
    active: { type: Boolean, default: true, index: true },
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

export default ProductScheme;
