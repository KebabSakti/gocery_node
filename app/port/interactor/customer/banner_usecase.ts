import BannerModel from "../../../entity/customer/banner_model";
import BannerOption from "../../../entity/customer/banner_option";
import BannerContract from "../../repository/customer/banner_contract";

class BannerUsecase {
  private repository: BannerContract;

  constructor(repository: BannerContract) {
    this.repository = repository;
  }

  async index(option: BannerOption): Promise<BannerModel[]> {
    return await this.repository.index(option);
  }
}

export default BannerUsecase;
