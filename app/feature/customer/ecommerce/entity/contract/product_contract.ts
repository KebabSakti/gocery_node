import ProductOption from "../model/product_option";
import ProductModel from "../model/product_model";

abstract class ProductContract {
  abstract index(option?: ProductOption): Promise<ProductModel[]>;

  abstract show(_id: string): Promise<ProductModel | null>;
}

export default ProductContract;
