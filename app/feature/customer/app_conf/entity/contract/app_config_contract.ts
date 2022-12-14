import AppConfigModel from "../model/app_config_model";

abstract class AppConfigContract {
  abstract show(): Promise<AppConfigModel>;
}

export default AppConfigContract;
