import { model, Schema } from "mongoose";

export interface BannerModel {
  _id?: string;
  image?: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const BannerScheme = model<BannerModel>(
  "banners",
  new Schema<BannerModel>({
    image: { type: String, required: true },
    active: { type: Boolean, default: true },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);
