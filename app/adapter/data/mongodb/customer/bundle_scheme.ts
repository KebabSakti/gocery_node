import { model, Schema } from "mongoose";
import BundleModel from "../../../../entity/customer/bundle_model";

const BundleScheme = model<BundleModel>(
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

export default BundleScheme;
