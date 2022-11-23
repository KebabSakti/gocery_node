import { CartModel, CartScheme } from "../model/cart_model";
import CartRepository from "../repository/cart_repository";

class CartMongo implements CartRepository {
  async show(customerId: string): Promise<CartModel | null> {
    const results = await CartScheme.findOne({ customer: customerId })
      .select("-created_at -updated_at -__v")
      .populate("items.product", "-active -created_at -updated_at");

    return results;
  }

  async upsert(cartModel: CartModel): Promise<void> {
    await CartScheme.findOneAndUpdate(
      { customer: cartModel.customer },
      cartModel,
      { upsert: true }
    );
  }

  async remove(customerId: string): Promise<void> {
    await CartScheme.remove({ customer: customerId });
  }
}

export default CartMongo;
