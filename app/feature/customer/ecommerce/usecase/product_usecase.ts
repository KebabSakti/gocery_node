import ProductContract from "./contract/product_contract";
import ProductOption from "../entity/product/product_option";
import ProductModel from "../entity/product/product_model";

class ProductUsecase {
  private repository: ProductContract;

  constructor(repository: ProductContract) {
    this.repository = repository;
  }

  async index(option?: ProductOption): Promise<ProductModel[]> {
    return await this.repository.index(option);
  }

  async show(_id: string): Promise<ProductModel | null> {
    return await this.repository.show(_id);
  }

  async showIncrementView(_id: string): Promise<ProductModel | null> {
    const results = await this.repository.show(_id);

    if (results != null) {
      await this.repository.incView(_id);
    }

    return results;
  }
}

export default ProductUsecase;
