import { OrderItemModel } from "./../../../order/model/order_model";
import { model, Schema } from "mongoose";

const OrderItemScheme = model<OrderItemModel>(
  "order_items",
  new Schema<OrderItemModel>({
    _id: { type: Schema.Types.ObjectId, required: true },
    order: { type: String, required: true },
    product: { type: String, required: true },
    name: { type: String, required: true, index: true },
    description: { type: String },
    image: { type: String, required: true },
    point: { type: Number, default: 0 },
    min: { type: Number, default: null },
    max: { type: Number, default: null },
    link: { type: String, default: null },
    category: {
      type: String,
      required: true,
    },
    currency: {
      code: { type: String, required: true },
      name: { type: String, required: true },
      symbol: { type: String, required: true },
    },
    price: {
      base: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      final: { type: Number, required: true },
    },
    unit: {
      name: { type: String, required: true },
      symbol: { type: String, required: true },
      count: { type: Number, required: true },
    },
    meta: {
      sold: { type: Number, default: 0 },
      view: { type: Number, default: 0 },
      favs: { type: Number, default: 0 },
    },
    note: { type: String, default: null },
    qty: { type: Number, required: true },
    total: { type: Number, required: true },
  })
);

export default OrderItemScheme;
