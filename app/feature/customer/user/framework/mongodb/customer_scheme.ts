import { model, Schema } from "mongoose";
import CustomerModel from "../../../user/entity/model/customer_model";

const CustomerScheme = model<CustomerModel>(
  "customers",
  new Schema<CustomerModel>({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, default: null },
    phone: { type: String, default: null },
    image: { type: String, default: null },
    fcm: { type: String, default: null },
    point: { type: Number, default: 0 },
    online: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);

export default CustomerScheme;
