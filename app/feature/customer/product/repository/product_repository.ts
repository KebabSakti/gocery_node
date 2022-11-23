import PagingOption from "../../../../core/model/paging_option";
import { ProductModel } from "../model/product_model";
import ProductIndexOption from "../model/product_index_option";

abstract class ProductRepository {
  abstract index(
    pagingOption: PagingOption,
    productIndexOption?: ProductIndexOption
  ): Promise<ProductModel[]>;

  abstract show(id: string): Promise<ProductModel | null>;

  abstract incrementView(id: string): Promise<void>;

  abstract incrementSold(id: string): Promise<void>;

  abstract incrementFavs(id: string): Promise<void>;
}

export default ProductRepository;
