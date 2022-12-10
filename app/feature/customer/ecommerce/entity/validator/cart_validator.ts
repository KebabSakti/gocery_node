import CartItem from "../model/cart_item";

abstract class CartValidator {
  abstract store(cartItem: CartItem): void;
}

export default CartValidator;
