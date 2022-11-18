import PagingOption from "../../../../core/model/paging_option";
import { ProductModel } from "../../../../core/model/product_structure";
import ProductIndexOption from "../model/product_index_option";

abstract class ProductRepository {
  abstract index(
    pagingOption: PagingOption,
    productIndexOption?: ProductIndexOption
  ): Promise<ProductModel[]>;

  abstract show(id: string): Promise<ProductModel | null>;
}

export default ProductRepository;
