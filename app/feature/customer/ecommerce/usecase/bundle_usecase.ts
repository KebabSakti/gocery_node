import BundleModel from "../entity/bundle/bundle_model";
import BundleOption from "../entity/bundle/bundle_option";
import BundleContract from "./contract/bundle_contract";

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
