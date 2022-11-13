import { CartItemModel, CartModel } from "../model/cart_model";

export abstract class CartRepository {
  abstract show(customer_uid: string): Promise<CartModel | null>;

  abstract store(cartModel: CartModel): Promise<void>;

  abstract update(cartModel: CartModel): Promise<void>;

  abstract remove(customer_uid: string): Promise<void>;
}

export abstract class CartItemRepository {
  abstract index(cart_uid: string): Promise<CartItemModel[]>;

  abstract show(uid: string): Promise<CartItemModel | null>;

  abstract store(cartItemModel: CartItemModel): Promise<void>;

  abstract update(cartItemModel: CartItemModel): Promise<void>;

  abstract remove(uid: string): Promise<void>;
}
