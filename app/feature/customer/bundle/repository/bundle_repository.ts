import PaginationOption from "../../../../core/model/pagination_option";
import {
  BundleModel,
  BundleItemModel,
  BundleWithItemModel,
} from "../model/bundle_model";

export abstract class BundleRepository {
  abstract index(): Promise<BundleModel[]>;
}

export abstract class BundleItemRepository {
  abstract index(
    bundle_uid: string,
    paginationOption?: PaginationOption
  ): Promise<BundleItemModel[]>;
}
