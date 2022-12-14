import { model, Schema } from "mongoose";
import OrderModel from "../../entity/model/order_model";

const OrderScheme = model<OrderModel>(
  "orders",
  new Schema<OrderModel>({
    status: { type: String, default: null },
    qty: { type: Number, required: true },
    total: { type: Number, required: true },
    invoice: { type: String, default: null },
    point: { type: Number, default: 0 },
    courier: {
      default: null,
      type: {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, default: null },
        phone: { type: String, default: null },
        image: { type: String, default: null },
      },
    },
    customer: {
      required: true,
      type: {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, default: null },
        phone: { type: String, default: null },
        image: { type: String, default: null },
        point: { type: Number, default: 0 },
      },
    },
    shipping: {
      default: null,
      type: {
        place_id: { type: String, default: null },
        address: { type: String, required: true },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        note: { type: String, default: null },
      },
    },
    delivery: {
      default: null,
      type: {
        distance: { type: Number, required: true },
        unit: { type: String, required: true },
        time: { type: String, required: true },
        fee: { type: Number, required: true },
      },
    },
    payment: {
      required: true,
      type: {
        _id: { type: String, required: true },
        category: { type: String, required: true },
        code: { type: String, required: true },
        name: { type: String, required: true },
        picture: { type: String, required: true },
        fee: { type: Number, required: true },
        percentage: { type: Number, required: true },
        min: { type: Number, required: true },
        max: { type: Number, required: true },
        cash: { type: Boolean, default: true },
        expire: { type: String, required: true },
        status: { type: String, default: null },
      },
    },
    items: {
      required: true,
      type: [
        { type: Schema.Types.ObjectId, required: true, ref: "order_items" },
      ],
    },
    bills: {
      default: [],
      type: [
        {
          name: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
    },
    deductors: {
      default: [],
      type: [
        {
          name: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
    },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);

export default OrderScheme;
