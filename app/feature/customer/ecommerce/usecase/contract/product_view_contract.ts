import ProductViewModel from "../../entity/product_view/product_view_model";
import ProductViewOption from "../../entity/product_view/product_view_option";

abstract class ProductViewContract {
  abstract index(
    customer_id: string,
    option?: ProductViewOption
  ): Promise<ProductViewModel[]>;

  abstract store(productViewModel: ProductViewModel): Promise<void>;
}

export default ProductViewContract;
