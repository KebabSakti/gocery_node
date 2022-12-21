import { Schema } from "mongoose";
import BillModel from "../../../../entity/customer/bill_model";

const BillSchema = new Schema<BillModel>({
  title: { type: String, required: true },
  value: { type: Number, required: true },
  active: { type: Boolean, required: true, default: null },
  selected: { type: Boolean, required: true, default: null },
  subtitle: { type: String, default: null },
  description: { type: String, default: null },
  note: { type: String, default: null },
});

export default BillSchema;
