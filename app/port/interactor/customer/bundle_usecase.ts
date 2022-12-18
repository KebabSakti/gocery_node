import BundleModel from "../../../entity/customer/bundle_model";
import BundleOption from "../../../entity/customer/bundle_option";
import BundleContract from "../../repository/customer/bundle_contract";

class BundleUsecase {
  private repository: BundleContract;

  constructor(repository: BundleContract) {
    this.repository = repository;
  }

  async getAllBundle(option?: BundleOption): Promise<BundleModel[]> {
    return await this.repository.getAllBundle(option);
  }
}

export default BundleUsecase;
