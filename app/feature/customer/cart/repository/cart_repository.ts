import { CartModel } from "../model/cart_model";

abstract class CartRepository {
  abstract show(customerId: string): Promise<CartModel | null>;

  abstract upsert(cartModel: CartModel): Promise<void>;

  abstract remove(customerId: string): Promise<void>;
}

export default CartRepository;
