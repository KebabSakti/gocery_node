import CartContract from "../entity/contract/cart_contract";
import ProductContract from "../entity/contract/product_contract";
import CartItem from "../entity/model/cart_item";
import CartModel from "../entity/model/cart_model";
import CartValidator from "../entity/validator/cart_store_validator";

class CartUsecase {
  private cartRepository: CartContract;
  private productRepository: ProductContract;
  private cartValidator: CartValidator;

  constructor(
    cartRepository: CartContract,
    productRepository: ProductContract,
    cartValidator: CartValidator
  ) {
    this.cartRepository = cartRepository;
    this.productRepository = productRepository;
    this.cartValidator = cartValidator;
  }

  async show(customer: string): Promise<CartModel | null> {
    return await this.cartRepository.show(customer);
  }

  async store(cartItem: CartItem): Promise<void> {
    this.cartValidator.store(cartItem);

    let cartModel: CartModel = {};

    const cart = await this.cartRepository.show(cartItem.customer);
    const product = await this.productRepository.show(cartItem.product);

    if (product != null) {
      if (cart == null) {
        cartModel = {
          customer: cartItem.customer,
          items: [
            {
              product: product._id!,
              qty: product.price?.final!,
              total: product.price?.final! * cartItem.qty,
            },
          ],
        };
      }
    }

    this.cartRepository.store(cartModel);
  }

  async remove(customer: string): Promise<void> {}
}

export default CartUsecase;
