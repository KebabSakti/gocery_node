import BundleOption from "../../entity/bundle/bundle_option";
import BundleModel from "../../entity/bundle/bundle_model";

abstract class BundleContract {
  abstract index(option?: BundleOption): Promise<BundleModel[]>;
}

export default BundleContract;
