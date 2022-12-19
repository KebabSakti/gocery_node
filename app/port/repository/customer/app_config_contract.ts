import AppConfigModel from "../../../entity/customer/app_config_model";

abstract class AppConfigContract {
  abstract show(): Promise<AppConfigModel>;
}

export default AppConfigContract;
