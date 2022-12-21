import { model } from "mongoose";
import BillModel from "../../../../entity/customer/bill_model";
import BillSchema from "./bill_schema";

const DeductorSchemaModel = model<BillModel>("deductors", BillSchema);

export default DeductorSchemaModel;
