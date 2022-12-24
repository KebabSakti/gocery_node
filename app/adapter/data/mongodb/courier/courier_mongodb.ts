import mongoose from "mongoose";
import CourierModel from "../../../../entity/courier/courier_model";
import CourierContract from "../../../../port/repository/courier/courier_contract";
import CourierScheme from "./courier_scheme";

class CourierMongodb implements CourierContract {
  async show(id: string): Promise<CourierModel | null> {
    let results: CourierModel | null = null;

    if (mongoose.isValidObjectId(id)) {
      results = await CourierScheme.findById(id, { active: true });
    }

    return results;
  }
}

export default CourierMongodb;
