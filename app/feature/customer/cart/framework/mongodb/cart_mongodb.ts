import CartContract from "../../entity/contract/cart_contract";
import CartModel from "../../entity/model/cart_model";
import CartScheme from "./cart_scheme";

class CartMongodb implements CartContract {
  async show(customer: string): Promise<CartModel | null> {
    const results = await CartScheme.findOne({ customer: customer })
      .select("-customer -created_at -updated_at -__v")
      .populate("items.product", "-active -created_at -updated_at");

    return results;
  }

  async store(cartModel: CartModel): Promise<void> {
    await CartScheme.findOneAndUpdate(
      { customer: cartModel.customer },
      { ...cartModel, updated_at: Date.now() },
      { upsert: true }
    );
  }

  async remove(customer: string): Promise<void> {
    await CartScheme.deleteOne({ customer: customer });
  }
}

export default CartMongodb;
