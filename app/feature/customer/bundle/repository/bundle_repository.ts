import PagingOption from "../../../../core/model/paging_option";
import { BundleModel } from "../model/bundle_model";

abstract class BundleRepository {
  abstract index(pagingOption?: PagingOption): Promise<BundleModel[]>;
}

export default BundleRepository;
