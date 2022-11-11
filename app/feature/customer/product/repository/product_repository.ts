import ProductModel from "../model/product_model";
import ProductOption from "../model/product_option";
import PaginationOption from "../../../../core/model/pagination_option";

abstract class ProductRepository {
  abstract index(
    productOption?: ProductOption,
    paginationOption?: PaginationOption
  ): Promise<ProductModel[]>;

  abstract show(uid: string): Promise<ProductModel | null>;
}

export default ProductRepository;
