import mongoose from "mongoose";
import DeliveryTimeModel from "../../../../entity/customer/delivery_time_model";
import DeliveryTimeContract from "../../../../port/repository/customer/delivery_time_contract";
import DeliveryTimeScheme from "./delivery_time_scheme";

class DeliveryTimeMongodb implements DeliveryTimeContract {
  async getById(id: string): Promise<DeliveryTimeModel | null> {
    let results: DeliveryTimeModel | null = null;

    if (mongoose.isValidObjectId(id)) {
      results = await DeliveryTimeScheme.findOne({ _id: id, active: true });
    }

    return results;
  }

  async getAll(): Promise<DeliveryTimeModel[]> {
    const results = await DeliveryTimeScheme.find({ active: true })
      .select("-created_at -updated_at -__v")
      .lean();

    return results;
  }
}

export default DeliveryTimeMongodb;
