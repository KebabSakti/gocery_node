import BannerContract from "../../entity/contract/customer/banner_contract";
import { BannerEntity } from "../../entity/model/banner_entity";

class BannerUsecase {
  private contract: BannerContract;

  constructor(contract: BannerContract) {
    this.contract = contract;
  }

  async index(): Promise<BannerEntity[]> {
    return await this.contract.index();
  }
}

export default BannerUsecase;
