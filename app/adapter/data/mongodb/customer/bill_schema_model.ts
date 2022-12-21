import { model } from "mongoose";
import BillModel from "../../../../entity/customer/bill_model";
import BillSchema from "./bill_schema";

const BillSchemaModel = model<BillModel>("bills", BillSchema);

export default BillSchemaModel;
