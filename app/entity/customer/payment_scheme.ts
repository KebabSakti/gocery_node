import { model, Schema } from "mongoose";
import PaymentModel from "./payment_model";

const PaymentScheme = model<PaymentModel>(
  "payments",
  new Schema<PaymentModel>({
    vendor: { type: String, required: true },
    category: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String, required: true },
    picture: { type: String, required: true },
    fee: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },
    min: { type: Number, default: null },
    max: { type: Number, default: null },
    cash: { type: Boolean, default: true },
    expire: { type: Number, default: null },
    help: { type: String, default: null },
    active: { type: Boolean, default: true, index: true },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);

export default PaymentScheme;
