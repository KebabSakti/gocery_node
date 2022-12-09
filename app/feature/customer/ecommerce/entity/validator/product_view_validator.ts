import ProductViewModel from "../model/product_view_model";

abstract class ProductViewValidator {
  abstract store(productViewModel: ProductViewModel): void;
}

export default ProductViewValidator;
