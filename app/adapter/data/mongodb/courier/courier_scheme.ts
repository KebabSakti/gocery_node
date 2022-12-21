import { model, Schema } from "mongoose";
import CourierModel from "../../../../entity/courier/courier_model";

const CourierScheme = model<CourierModel>(
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

export default CourierScheme;
