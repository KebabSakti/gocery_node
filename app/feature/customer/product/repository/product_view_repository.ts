import ProductViewModel from "../model/product_view_model";
import PaginationOption from "../../../../core/model/pagination_option";

abstract class ProductViewRepository {
  abstract index(
    customer_uid: string,
    paginationOption?: PaginationOption
  ): Promise<ProductViewModel[]>;

  abstract store(productViewModel: ProductViewModel): Promise<void>;
}

export default ProductViewRepository;
