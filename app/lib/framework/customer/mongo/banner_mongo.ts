import { BannerScheme } from "./../../../../feature/customer/banner/model/banner_model";
import BannerContract from "../../../entity/contract/customer/banner_contract";
import { BannerEntity } from "../../../entity/model/banner_entity";

class BannerMongo implements BannerContract {
  async index(): Promise<BannerEntity[]> {
    const results: BannerEntity[] = await BannerScheme.find({
      active: true,
    }).select("-active -created_at -updated_at -__v");

    return results;
  }
}

export default BannerMongo;
