import { model, Schema } from "mongoose";
import DeliveryTimeModel from "../../../../entity/customer/delivery_time_model";

const DeliveryTimeScheme = model<DeliveryTimeModel>(
  "delivery_times",
  new Schema<DeliveryTimeModel>({
    time: { type: String, required: true },
    active: { type: Boolean, default: false },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);

export default DeliveryTimeScheme;
