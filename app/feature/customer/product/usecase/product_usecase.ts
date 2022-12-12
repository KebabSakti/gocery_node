import ProductContract from "../entity/contract/product_contract";
import ProductMetaContract from "../entity/contract/product_meta_contract";
import ProductViewContract from "../entity/contract/product_view_contract";
import ProductModel from "../entity/model/product_model";
import ProductOption from "../entity/model/product_option";
import ProductViewModel from "../entity/model/product_view_model";
import ProductViewOption from "../entity/model/product_view_option";
import ProductViewValidator from "../entity/validator/product_view_validator";

class ProductUsecase {
  private productRepository: ProductContract;
  private productViewRepository: ProductViewContract;
  private productMetaRepository: ProductMetaContract;
  private productViewValidator: ProductViewValidator;

  constructor(
    productRepository: ProductContract,
    productViewRepository: ProductViewContract,
    productMetaRepository: ProductMetaContract,
    productViewValidator: ProductViewValidator
  ) {
    this.productRepository = productRepository;
    this.productViewRepository = productViewRepository;
    this.productMetaRepository = productMetaRepository;
    this.productViewValidator = productViewValidator;
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
    this.productViewValidator.store(productViewModel);

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
