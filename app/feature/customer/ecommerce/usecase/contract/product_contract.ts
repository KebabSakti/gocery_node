import ProductOption from "../../entity/product/product_option";
import ProductModel from "../../entity/product/product_model";

abstract class ProductContract {
  abstract index(option?: ProductOption): Promise<ProductModel[]>;

  abstract show(_id: string): Promise<ProductModel | null>;

  abstract incView(_id: string): Promise<void>;
}

export default ProductContract;
