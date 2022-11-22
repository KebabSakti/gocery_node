import mongoose from "mongoose";
import { CartModel, CartScheme } from "../model/cart_model";
import CartRepository from "../repository/cart_repository";

class CartMongo implements CartRepository {
  async show(customerId: string): Promise<CartModel | null> {
    let results: CartModel | null = null;

    if (mongoose.isValidObjectId(customerId)) {
      results = await CartScheme.findOne({ customer: customerId })
        .select("-created_at -updated_at -__v")
        .populate("items.product", "-active -created_at -updated_at");
    }

    return results;
  }

  async upsert(cartModel: CartModel): Promise<void> {
    if (mongoose.isValidObjectId(cartModel.customer)) {
      await CartScheme.findOneAndUpdate(
        { customer: cartModel.customer },
        cartModel,
        { upsert: true }
      );
    }
  }

  async remove(id: string): Promise<void> {
    if (mongoose.isValidObjectId(id)) {
      await CartScheme.remove({ _id: id });
    }
  }
}

export default CartMongo;
