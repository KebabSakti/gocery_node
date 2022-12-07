import { model, Schema } from "mongoose";
import BannerModel from "../../entity/banner_model";

const BannerScheme = model<BannerModel>(
  "banners",
  new Schema<BannerModel>({
    image: { type: String, required: true },
    active: { type: Boolean, default: true, index: true },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);

export default BannerScheme;
