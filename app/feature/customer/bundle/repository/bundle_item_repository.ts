import PaginationOption from "../../../../core/model/pagination_option";
import BundleItemModel from "../model/bundle_item_model";

abstract class BundleItemRepository {
  abstract index(
    bundle_uid: string,
    paginationOption?: PaginationOption
  ): Promise<BundleItemModel[]>;
}

export default BundleItemRepository;
