import {
  ProductFavouriteModel,
  ProductModel,
  ProductOption,
  ProductViewModel,
} from "../model/product_model";
import PaginationOption from "../../../../core/model/pagination_option";

export abstract class ProductRepository {
  abstract index(
    productOption?: ProductOption,
    paginationOption?: PaginationOption
  ): Promise<ProductModel[]>;

  abstract show(uid: string): Promise<ProductModel | null>;
}

export abstract class ProductViewRepository {
  abstract index(
    customer_uid: string,
    paginationOption?: PaginationOption
  ): Promise<ProductViewModel[]>;

  abstract store(productViewModel: ProductViewModel): Promise<void>;
}

export abstract class ProductFavouriteRepository {
  abstract index(
    customer_uid: string,
    paginationOption?: PaginationOption
  ): Promise<ProductModel[]>;

  abstract store(productFavouriteModel: ProductFavouriteModel): Promise<void>;

  abstract remove(productFavouriteModel: ProductFavouriteModel): Promise<void>;
}
