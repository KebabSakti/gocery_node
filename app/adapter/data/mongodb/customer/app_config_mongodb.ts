import { InternalServerError } from "../../../../common/error/exception";
import AppConfigModel from "../../../../entity/customer/app_config_model";
import AppConfigContract from "../../../../port/repository/customer/app_config_contract";
import AppConfigScheme from "./app_config_scheme";

class AppConfigMongodb implements AppConfigContract {
  async show(): Promise<AppConfigModel> {
    const results = await AppConfigScheme.findOne();

    if (results != null) {
      return results;
    }

    throw new InternalServerError("Configuration not found");
  }
}

export default AppConfigMongodb;
