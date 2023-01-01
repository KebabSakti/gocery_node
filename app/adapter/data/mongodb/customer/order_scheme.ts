import { model, Schema } from "mongoose";
import OrderModel from "../../../../entity/customer/order_model";
import BillSchema from "./bill_schema";

const OrderScheme = model<OrderModel>(
  "orders",
  new Schema<OrderModel>({
    status: { type: String, default: null },
    qty: { type: Number, required: true },
    total: { type: Number, required: true },
    invoice: { type: String, default: null },
    point: { type: Number, default: 0 },
    clearCart: { type: Boolean, default: false },
    courier: {
      default: null,
      type: {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        fcm: { type: String, required: true },
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
        fcm: { type: String, required: true },
        email: { type: String, default: null },
        phone: { type: String, default: null },
        image: { type: String, default: null },
        point: { type: Number, default: 0 },
      },
    },
    shipping: {
      default: null,
      type: {
        fee: { type: Number, required: true },
        origin: {
          placeId: { type: String, required: true },
          latLng: { type: String, required: true },
        },
        destination: {
          place: { type: String, required: true },
          address: { type: String, required: true },
          name: { type: String, required: true },
          phone: { type: String, required: true },
          distance: { type: String, required: true },
          duration: { type: String, required: true },
          note: { type: String, default: null },
        },
        schedule: {
          timeId: { type: String, required: true },
          time: { type: String, required: true },
        },
        meta: {
          distance: { type: Number, required: true },
          duration: { type: Number, required: true },
        },
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
        note: { type: String, default: null },
        // info: { type: String, required: true },
        fee: { type: Number, required: true },
        percentage: { type: Number, required: true },
        min: { type: Number, default: null },
        max: { type: Number, default: null },
        cash: { type: Boolean, default: true },
        expire: { type: String, default: null },
        status: { type: String, default: null },
        help: { type: String, default: null },
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
      type: [BillSchema],
    },
    deductors: {
      default: [],
      type: [BillSchema],
    },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);

export default OrderScheme;
