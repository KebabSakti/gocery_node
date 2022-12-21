import BillModel from "../../../../entity/customer/bill_model";
import BillContract from "../../../../port/repository/customer/bill_contract";
import BillSchemaModel from "./bill_schema_model";

class BillMongodb implements BillContract {
  async getAllActiveBill(): Promise<BillModel[]> {
    const results = await BillSchemaModel.find({
      active: true,
    }).select("-active -created_at -updated_at -__v");

    return results;
  }

  async getBillById(id: string): Promise<BillModel | null> {
    const results = await BillSchemaModel.findOne({
      _id: id,
      active: true,
    }).select("-created_at -updated_at -__v");

    return results;
  }
}

export default BillMongodb;
