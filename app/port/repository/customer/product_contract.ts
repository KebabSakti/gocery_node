import ProductModel from "../../../entity/customer/product_model";
import ProductOption from "../../../entity/customer/product_option";

abstract class ProductContract {
  abstract getAllProduct(option?: ProductOption): Promise<ProductModel[]>;

  abstract getProductById(productId: string): Promise<ProductModel | null>;
}

export default ProductContract;
