import mongoose from "mongoose";
import { CourierModel, CourierScheme } from "../model/courier_model";
import CourierRepository from "../repository/courier_repository";

class CourierMongo implements CourierRepository {
  async show(id: string): Promise<CourierModel | null> {
    let results: CourierModel | null = null;

    if (mongoose.isValidObjectId(id)) {
      results = await CourierScheme.findById(id, { active: true });
    }

    return results;
  }
}

export default CourierMongo;
