import { model, Schema } from "mongoose";
import AppConfigModel from "../../entity/model/app_config_model";

const AppConfigScheme = model<AppConfigModel>(
  "app_configs",
  new Schema<AppConfigModel>({
    fee: {
      delivery: { type: Number, default: 0 },
    },
  })
);

export default AppConfigScheme;
