import CartContract from "../entity/contract/cart_contract";
import ProductContract from "../entity/contract/product_contract";
import CartModel from "../entity/model/cart_model";

class CartUsecase {
  private cartRepository: CartContract;
  private productRepository: ProductContract;

  constructor(cartRepository: CartContract) {
    this.cartRepository = cartRepository;
  }

  async show(customer: string): Promise<CartModel | null> {
    return await this.cartRepository.show(customer);
  }

  async store(cartModel: CartModel): Promise<void> {}

  async remove(customer: string): Promise<void> {}
}

export default CartUsecase;
