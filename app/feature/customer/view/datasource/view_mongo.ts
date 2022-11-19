import mongoose from "mongoose";
import PagingOption from "../../../../core/model/paging_option";
import { ViewModel, ViewScheme } from "../model/view_model";
import ViewRepository from "../repository/view_repository";

class ViewMongo implements ViewRepository {
  async index(id: string, pagingOption?: PagingOption): Promise<ViewModel[]> {
    let results: ViewModel[] = [];

    if (mongoose.isValidObjectId(id)) {
      const query = ViewScheme.find({ customer: id })
        .sort({ updated_at: "desc" })
        .populate("product", "-active -created_at -updated_at -__v")
        .select("-active -created_at -updated_at -__v");

      if (pagingOption != undefined) {
        query.skip(pagingOption.offset).limit(pagingOption.limit);
      }

      results = await query.exec();
    }

    return results;
  }

  async upsert(viewModel: ViewModel): Promise<void> {
    if (
      mongoose.isValidObjectId(viewModel.customer) &&
      mongoose.isValidObjectId(viewModel.product)
    ) {
      await ViewScheme.updateOne(
        { customer: viewModel.customer, product: viewModel.product },
        { ...viewModel, $inc: { hit: 1 } },
        { upsert: true }
      );
    }
  }
}

export default ViewMongo;
