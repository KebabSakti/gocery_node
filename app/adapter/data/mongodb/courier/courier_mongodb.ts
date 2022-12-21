import mongoose from "mongoose";
import CourierModel from "../../../../entity/courier/courier_model";
import CourierRepository from "../../../../port/repository/courier/courier_repository";
import CourierScheme from "./courier_scheme";

class CourierMongodb implements CourierRepository {
  async show(id: string): Promise<CourierModel | null> {
    let results: CourierModel | null = null;

    if (mongoose.isValidObjectId(id)) {
      results = await CourierScheme.findById(id, { active: true });
    }

    return results;
  }
}

export default CourierMongodb;
