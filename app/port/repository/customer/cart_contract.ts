import CartModel from "../../../entity/customer/cart_model";

abstract class CartContract {
  abstract getCartByCustomerId(customerId: string): Promise<CartModel | null>;

  abstract updateCart(cartModel: CartModel): Promise<void>;

  abstract clearCart(customerId: string): Promise<void>;
}

export default CartContract;
