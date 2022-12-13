import { InternalServerError } from "./../../../../../core/config/errors";
import AppConfigContract from "../../entity/contract/app_config_contract";
import AppConfigModel from "../../entity/model/app_config_model";
import AppConfigScheme from "./app_config_scheme";

class AppConfigMongodb implements AppConfigContract {
  async show(): Promise<AppConfigModel> {
    const results = await AppConfigScheme.findOne();

    if (results != null) {
      return results;
    }

    throw new InternalServerError("Configuration template not found");
  }
}

export default AppConfigMongodb;
