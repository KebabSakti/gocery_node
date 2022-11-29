import { model, Schema } from "mongoose";

export interface CourierModel {
  _id?: string;
  name?: string;
  phone?: string;
  image?: string;
  fcm?: string;
  email?: string;
  password?: string;
  online?: boolean;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const CourierScheme = model<CourierModel>(
  "couriers",
  new Schema<CourierModel>({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    image: { type: String, required: true },
    fcm: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    online: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);
