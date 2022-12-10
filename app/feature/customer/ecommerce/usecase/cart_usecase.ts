import CartContract from "../entity/contract/cart_contract";
import ProductContract from "../entity/contract/product_contract";
import CartItem from "../entity/model/cart_item";
import CartModel from "../entity/model/cart_model";
import CartValidator from "../entity/validator/cart_validator";

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

    const cart = await this.cartRepository.show(cartItem.customer);
    const product = await this.productRepository.show(cartItem.product);

    if (product != null) {
      let items = [];

      const productItem = {
        product: product._id!,
        qty: cartItem.qty,
        total: product.price?.final! * cartItem.qty,
      };

      if (cart == null) {
        items = [productItem];
      } else {
        const updatedItems = [
          ...cart.items!.filter(
            (e) => (e.product as any)._id.toString() != product._id
          ),
          productItem,
        ];

        items = updatedItems;
      }

      items = items.filter((e) => e.qty > 0);

      let qty = 0;
      let total = 0;

      items.forEach((e) => {
        qty += e.qty;
        total += e.total;
      });

      const cartModel: CartModel = {
        customer: cartItem.customer,
        qty: qty,
        total: total,
        items: items,
      };

      if (items.length == 0) {
        await this.cartRepository.remove(cartItem.customer);
      } else {
        await this.cartRepository.store(cartModel);
      }
    }
  }

  async remove(customer: string): Promise<void> {
    await this.cartRepository.remove(customer);
  }
}

export default CartUsecase;
