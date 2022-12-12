import BundleOption from "..//model/bundle_option";
import BundleModel from "../model/bundle_model";

abstract class BundleContract {
  abstract index(option?: BundleOption): Promise<BundleModel[]>;
}

export default BundleContract;
