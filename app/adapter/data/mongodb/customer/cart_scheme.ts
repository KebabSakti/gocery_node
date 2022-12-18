import { model, Schema } from "mongoose";
import CartModel from "../../../../entity/customer/cart_model";

const CartScheme = model<CartModel>(
  "carts",
  new Schema<CartModel>({
    customer: { type: String, required: true },
    qty: { type: Number, required: true },
    total: { type: Number, required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "products" },
        qty: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);

export default CartScheme;
