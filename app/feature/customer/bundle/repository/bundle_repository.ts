import BundleModel from "../model/bundle_model";

abstract class BundleRepository {
  abstract index(): Promise<BundleModel[]>;
}

export default BundleRepository;
