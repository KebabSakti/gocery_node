import CartItem from "../model/cart_item";
import CartModel from "../model/cart_model";
import CartTotal from "../model/cart_total";

abstract class CartContract {
  abstract show(customer: string): Promise<CartModel | null>;

  abstract store(cartModel: CartModel): Promise<void>;

  abstract remove(customer: string): Promise<void>;

  abstract calculateTotal(cartItems: CartItem[]): CartTotal;
}

export default CartContract;
