import PagingOption from "../../../../core/model/paging_option";
import { BundleModel } from "../../../../core/model/bundle_structure";

abstract class BundleRepository {
  abstract index(pagingOption?: PagingOption): Promise<BundleModel[]>;
}

export default BundleRepository;
