import BannerRepository from "../repository/banner_repository";
import {
  BannerModel,
  BannerScheme,
} from "../../../../core/model/banner_structure";

export class BannerMongo implements BannerRepository {
  async index(): Promise<BannerModel[]> {
    const results: BannerModel[] = await BannerScheme.find({
      active: 1,
    }).select("-active -created_at -updated_at -__v");

    return results;
  }
}

export default BannerMongo;
