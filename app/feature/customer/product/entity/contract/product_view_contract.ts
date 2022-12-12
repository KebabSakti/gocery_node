import ProductViewModel from "../../entity/model/product_view_model";
import ProductViewOption from "../../entity/model/product_view_option";

abstract class ProductViewContract {
  abstract index(
    customer_id: string,
    option?: ProductViewOption
  ): Promise<ProductViewModel[]>;

  abstract store(productViewModel: ProductViewModel): Promise<void>;
}

export default ProductViewContract;
