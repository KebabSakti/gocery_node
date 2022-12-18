import BundleModel from "../../../entity/customer/bundle_model";
import BundleOption from "../../../entity/customer/bundle_option";

abstract class BundleContract {
  abstract getAllBundle(option?: BundleOption): Promise<BundleModel[]>;
}

export default BundleContract;
