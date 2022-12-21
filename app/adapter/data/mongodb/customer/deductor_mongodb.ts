import BillModel from "../../../../entity/customer/bill_model";
import DeductorContract from "../../../../port/repository/customer/deductor_contract";
import DeductorSchemaModel from "./deductor_schema_model";

class DeductorMongodb implements DeductorContract {
  async getAllActiveDeductor(): Promise<BillModel[]> {
    const results = await DeductorSchemaModel.find({
      active: true,
    }).select("-active -created_at -updated_at -__v");

    return results;
  }

  async getDeductorById(id: string): Promise<BillModel | null> {
    const results = await DeductorSchemaModel.findOne({
      _id: id,
      active: true,
    }).select("-created_at -updated_at -__v");

    return results;
  }
}

export default DeductorMongodb;
