import ProductContract from "./contract/product_contract";
import ProductOption from "../entity/product/product_option";
import ProductModel from "../entity/product/product_model";
import ProductViewContract from "./contract/product_view_contract";
import ProductMetaContract from "./contract/product_meta_contract";
import ProductViewModel from "../entity/product_view/product_view_model";
import ProductViewOption from "../entity/product_view/product_view_option";

class ProductUsecase {
  private productRepository: ProductContract;
  private productViewRepository: ProductViewContract;
  private productMetaRepository: ProductMetaContract;

  constructor(
    productRepository: ProductContract,
    productViewRepository: ProductViewContract,
    productMetaRepository: ProductMetaContract
  ) {
    this.productRepository = productRepository;
    this.productViewRepository = productViewRepository;
    this.productMetaRepository = productMetaRepository;
  }

  async index(option?: ProductOption): Promise<ProductModel[]> {
    return await this.productRepository.index(option);
  }

  async show(_id: string): Promise<ProductModel | null> {
    return await this.productRepository.show(_id);
  }

  async productViewIndex(
    customer_id: string,
    option?: ProductViewOption
  ): Promise<ProductViewModel[]> {
    return await this.productViewRepository.index(customer_id, option);
  }

  async showIncrementView(
    productViewModel: ProductViewModel
  ): Promise<ProductModel | null> {
    const results = await this.productRepository.show(
      productViewModel.product!
    );

    if (results != null) {
      await this.productMetaRepository.incrementProductView(
        productViewModel.product!
      );

      await this.productViewRepository.store(productViewModel);
    }

    return results;
  }
}

export default ProductUsecase;
