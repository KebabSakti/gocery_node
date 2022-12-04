import { model, Schema } from "mongoose";
import { BannerEntity } from "../../../entity/model/banner_entity";

const BannerScheme = model<BannerEntity>(
  "banners",
  new Schema<BannerEntity>({
    image: { type: String, required: true },
    active: { type: Boolean, default: true },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);

export default BannerScheme;
