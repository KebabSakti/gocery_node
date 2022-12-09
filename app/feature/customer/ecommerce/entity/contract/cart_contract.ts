import CartModel from "../model/cart_model";

abstract class CartContract {
  abstract show(customer: string): Promise<CartModel | null>;

  abstract store(cartModel: CartModel): Promise<void>;

  abstract remove(customer: string): Promise<void>;
}

export default CartContract;
