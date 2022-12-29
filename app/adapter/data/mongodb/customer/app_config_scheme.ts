import { model, Schema } from "mongoose";
import AppConfigModel from "../../../../entity/customer/app_config_model";
import BillSchema from "./bill_schema";

const AppConfigScheme = model<AppConfigModel>(
  "app_configs",
  new Schema<AppConfigModel>({
    fee: {
      delivery: { type: Number, default: 0 },
    },
    origin: {
      placeId: { type: String, required: true },
      latLng: { type: String, required: true },
    },
    bills: {
      default: [],
      type: [BillSchema],
    },
    deductors: {
      default: [],
      type: [BillSchema],
    },
  })
);

export default AppConfigScheme;
