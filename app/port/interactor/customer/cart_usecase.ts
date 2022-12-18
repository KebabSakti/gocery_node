import CartItem from "../../../entity/customer/cart_item";
import CartModel from "../../../entity/customer/cart_model";
import CartContract from "../../repository/customer/cart_contract";
import ProductContract from "../../repository/customer/product_contract";

class CartUsecase {
  private cartRepository: CartContract;
  private productRepository: ProductContract;

  constructor(
    cartRepository: CartContract,
    productRepository: ProductContract
  ) {
    this.cartRepository = cartRepository;
    this.productRepository = productRepository;
  }

  async getCartByCustomerId(customerId: string): Promise<CartModel | null> {
    return await this.cartRepository.getCartByCustomerId(customerId);
  }

  async updateCart(cartItem: CartItem): Promise<void> {
    const cart = await this.cartRepository.getCartByCustomerId(
      cartItem.customer
    );

    const product = await this.productRepository.getProductById(
      cartItem.product
    );

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
            (e: any) => (e.product as any)._id.toString() != product._id
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
        await this.cartRepository.clearCart(cartItem.customer);
      } else {
        await this.cartRepository.updateCart(cartModel);
      }
    }
  }

  async clearCart(customer: string): Promise<void> {
    await this.cartRepository.clearCart(customer);
  }
}

export default CartUsecase;
