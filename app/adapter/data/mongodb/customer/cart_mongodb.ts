import CartModel from "../../../../entity/customer/cart_model";
import CartContract from "../../../../port/repository/customer/cart_contract";
import CartScheme from "./cart_scheme";

class CartMongodb implements CartContract {
  async getCartByCustomerId(customer: string): Promise<CartModel | null> {
    const results = await CartScheme.findOne({ customer: customer })
      .select("-customer -created_at -updated_at -__v")
      .populate("items.product", "-active -created_at -updated_at");

    return results;
  }

  async updateCart(cartModel: CartModel): Promise<void> {
    await CartScheme.findOneAndUpdate(
      { customer: cartModel.customer },
      { ...cartModel, updated_at: Date.now() },
      { upsert: true }
    );
  }

  async clearCart(customer: string): Promise<void> {
    await CartScheme.deleteOne({ customer: customer });
  }
}

export default CartMongodb;
