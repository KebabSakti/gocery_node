import AppConfigModel from "../model/app_config_model";

abstract class AppConfigContract {
  abstract show(): Promise<AppConfigModel>;

  abstract deliveryFee(distance: number): Promise<number>;
}

export default AppConfigContract;
