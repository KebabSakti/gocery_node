import PagingOption from "../../../../core/model/paging_option";
import { BundleModel, BundleScheme } from "../model/bundle_model";
import BundleRepository from "../repository/bundle_repository";

class BundleMongo implements BundleRepository {
  async index(pagingOption?: PagingOption | undefined): Promise<BundleModel[]> {
    const query = BundleScheme.find({ active: true })
      .populate("products", "-active -created_at -updated_at")
      .select("-active -created_at -updated_at -__v");

    if (pagingOption != undefined) {
      query.skip(pagingOption.offset).limit(pagingOption.limit);
    }

    const results: BundleModel[] = await query.exec();

    return results;
  }
}

export default BundleMongo;
