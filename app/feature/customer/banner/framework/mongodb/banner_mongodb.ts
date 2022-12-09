import BannerModel from "../../entity/model/banner_model";
import BannerOption from "../../entity/model/banner_option";
import BannerContract from "../../entity/contract/banner_contract";
import BannerScheme from "./banner_scheme";

class BannerMongodb implements BannerContract {
  async index(option?: BannerOption | undefined): Promise<BannerModel[]> {
    const query = BannerScheme.find({
      active: true,
    }).select("-active -created_at -updated_at -__v");

    if (option != undefined) {
      if (option.pagination != undefined) {
        query.skip(option.pagination.offset).limit(option.pagination.limit);
      }
    }

    const results = await query.exec();

    return results;
  }
}

export default BannerMongodb;
