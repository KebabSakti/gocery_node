import BannerModel from "../../entity/banner_model";
import BannerOption from "../../entity/banner_option";
import BannerContract from "../../usecase/contract/banner_contract";
import BannerScheme from "./banner_scheme";

class BannerMongodb implements BannerContract {
  async index(option?: BannerOption | undefined): Promise<BannerModel[]> {
    const query = BannerScheme.find({
      active: true,
    }).select("-active -created_at -updated_at -__v");

    if (option != undefined) {
      //paginate result
      if (option.pagination != undefined) {
        query.skip(option.pagination.offset).limit(option.pagination.limit);
      }
    }

    const results = await query.exec();

    return results;
  }
}

export default BannerMongodb;
