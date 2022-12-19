import AppConfigModel from "../../../entity/customer/app_config_model";
import AppConfigContract from "../../repository/customer/app_config_contract";

class AppConfigUsecase {
  private repository: AppConfigContract;

  constructor(repository: AppConfigContract) {
    this.repository = repository;
  }

  async show(): Promise<AppConfigModel> {
    return await this.repository.show();
  }
}

export default AppConfigUsecase;
