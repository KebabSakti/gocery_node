import BannerModel from "../entity/model/banner_model";
import BannerOption from "../entity/model/banner_option";
import BannerContract from "../entity/contract/banner_contract";

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
