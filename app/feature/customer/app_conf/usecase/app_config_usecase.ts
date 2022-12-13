import AppConfigContract from "../entity/contract/app_config_contract";
import AppConfigModel from "../entity/model/app_config_model";

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
