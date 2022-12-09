import ProductViewModel from "../../../entity/product_view/product_view_model";
import { model, Schema } from "mongoose";

const ProductViewScheme = model<ProductViewModel>(
  "product_views",
  new Schema<ProductViewModel>({
    customer: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, required: true, ref: "products" },
    hit: { type: Number, default: 1 },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);

export default ProductViewScheme;
