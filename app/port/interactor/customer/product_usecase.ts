import ProductModel from "../../../entity/customer/product_model";
import ProductOption from "../../../entity/customer/product_option";
import ProductViewModel from "../../../entity/customer/product_view_model";
import ProductViewOption from "../../../entity/customer/product_view_option";
import ProductContract from "../../repository/customer/product_contract";
import ProductMetaContract from "../../repository/customer/product_meta_contract";
import ProductViewContract from "../../repository/customer/product_view_contract";

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

  async getAllProduct(option?: ProductOption): Promise<ProductModel[]> {
    return await this.productRepository.getAllProduct(option);
  }

  async getProductById(productId: string): Promise<ProductModel | null> {
    return await this.productRepository.getProductById(productId);
  }

  async getAllProductView(
    customerId: string,
    option?: ProductViewOption
  ): Promise<ProductViewModel[]> {
    return await this.productViewRepository.getAllProductView(
      customerId,
      option
    );
  }

  async getProductByIdWithIncrement(
    productViewModel: ProductViewModel
  ): Promise<ProductModel | null> {
    const results = await this.productRepository.getProductById(
      productViewModel.product!
    );

    if (results != null) {
      await this.productMetaRepository.incrementProductView(
        productViewModel.product!
      );

      await this.productViewRepository.addProductView(productViewModel);
    }

    return results;
  }
}

export default ProductUsecase;
