import PagingOption from "../../../../core/model/paging_option";
import {
  ProductModel,
  ProductScheme,
} from "../../../../core/model/product_structure";
import ProductIndexOption from "../model/product_index_option";
import ProductRepository from "../repository/product_repository";

class ProductMongo implements ProductRepository {
  async index(
    productIndexOption?: ProductIndexOption | undefined,
    pagingOption?: PagingOption | undefined
  ): Promise<ProductModel[]> {
    const query = ProductScheme.find({ active: 1 }).select(
      "-active -created_at -updated_at -__v"
    );

    if (productIndexOption != undefined) {
    }

    if (pagingOption != undefined) {
      query.skip(pagingOption.offset).limit(pagingOption.limit);
    }

    const results: ProductModel[] = await query.exec();

    return results;
  }
}

export default ProductMongo;
