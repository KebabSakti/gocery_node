import CartContract from "../../entity/contract/cart_contract";
import CartItem from "../../entity/model/cart_item";
import CartModel from "../../entity/model/cart_model";
import CartTotal from "../../entity/model/cart_total";

class CartMongodb implements CartContract {
  show(customer: string): Promise<CartModel | null> {
    throw new Error("Method not implemented.");
  }

  store(cartModel: CartModel): Promise<void> {
    throw new Error("Method not implemented.");
  }

  remove(customer: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  calculateTotal(cartItems: CartItem[]): CartTotal {
    throw new Error("Method not implemented.");
  }
}
