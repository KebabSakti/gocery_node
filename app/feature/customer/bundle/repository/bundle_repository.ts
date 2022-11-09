import BundleModel from "../model/bundle_model";

abstract class BundleRepository {
  abstract bundles(): Promise<BundleModel[]>;

  abstract bundle(uid: string): Promise<BundleModel | null>;
}

export default BundleRepository;
