import BundleContract from "../entity/contract/bundle_contract";
import BundleModel from "../entity/model/bundle_model";
import BundleOption from "../entity/model/bundle_option";

class BundleUsecase {
  private repository: BundleContract;

  constructor(repository: BundleContract) {
    this.repository = repository;
  }

  async index(option?: BundleOption): Promise<BundleModel[]> {
    return await this.repository.index(option);
  }
}

export default BundleUsecase;
