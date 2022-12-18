import ProductViewModel from "../../../entity/customer/product_view_model";
import ProductViewOption from "../../../entity/customer/product_view_option";

abstract class ProductViewContract {
  abstract getAllProductView(
    customerId: string,
    option?: ProductViewOption
  ): Promise<ProductViewModel[]>;

  abstract addProductView(productViewModel: ProductViewModel): Promise<void>;
}

export default ProductViewContract;
