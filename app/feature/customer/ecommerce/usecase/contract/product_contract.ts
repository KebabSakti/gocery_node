import ProductOption from "../../entity/product/product_option";
import ProductModel from "../../entity/product/product_model";

abstract class ProductContract {
  abstract index(option?: ProductOption): Promise<ProductModel[]>;

  abstract show(_id: string): Promise<ProductModel | null>;
}

export default ProductContract;
