import ProductModel from "../model/product_model";
import ProductOption from "../model/product_option";
import PaginationOption from "../../../../core/model/pagination_option";

abstract class ProductRepository {
  abstract products(
    productOption?: ProductOption,
    paginationOption?: PaginationOption
  ): Promise<ProductModel[]>;

  abstract product(uid: string): Promise<ProductModel | null>;
}

export default ProductRepository;
