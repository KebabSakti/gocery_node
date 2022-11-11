import ProductViewModel from "../model/product_view_model";
import PaginationOption from "../../../../core/model/pagination_option";

abstract class ProductViewRepository {
  abstract fetch(
    customer_uid: string,
    paginationOption?: PaginationOption
  ): Promise<ProductViewModel[]>;

  abstract show(uid: string): Promise<ProductViewModel | null>;

  abstract store(productViewModel: ProductViewModel): Promise<void>;

  abstract update(uid: string): Promise<void>;
}

export default ProductViewRepository;
