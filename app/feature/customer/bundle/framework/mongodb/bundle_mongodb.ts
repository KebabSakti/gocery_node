import BundleModel from "../../entity/model/bundle_model";
import BundleOption from "../../entity/model/bundle_option";
import BundleContract from "../../entity/contract/bundle_contract";
import BundleScheme from "./bundle_scheme";

class BundelMongodb implements BundleContract {
  async index(option?: BundleOption | undefined): Promise<BundleModel[]> {
    const query = BundleScheme.find({ active: true })
      .populate("products", "-active -created_at -updated_at")
      .select("-active -created_at -updated_at -__v");

    if (option != undefined) {
      if (option.name != undefined) {
        query.where({
          name: { $regex: option.name, $options: "i" },
        });
      }

      if (option.pagination != undefined) {
        query.skip(option.pagination.offset).limit(option.pagination.limit);
      }
    }

    const results = await query.exec();

    return results;
  }
}

export default BundelMongodb;
