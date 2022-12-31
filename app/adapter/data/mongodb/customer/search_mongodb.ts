import mongoose from "mongoose";
import SearchModel from "../../../../entity/customer/search_model";
import SearchOption from "../../../../entity/customer/search_option";
import SearchContract from "../../../../port/repository/customer/search_contract";
import SearchScheme from "./search_scheme";

class SearchMongodb implements SearchContract {
  async index(option?: SearchOption | undefined): Promise<SearchModel[]> {
    const query = SearchScheme.find()
      .sort({ created_at: "desc" })
      .select("-customer -active -created_at -updated_at -__v");

    if (option != undefined) {
      if (option.customer != undefined) {
        query.where({
          customer: option.customer,
        });
      }

      if (option.keyword != undefined) {
        query.where({
          keyword: { $regex: option.keyword, $options: "i" },
        });
      }

      if (option.pagination != undefined) {
        query.skip(option.pagination.offset).limit(option.pagination.limit);
      }
    }

    const results = await query.exec();

    return results;
  }

  async store(searchModel: SearchModel): Promise<void> {
    await SearchScheme.findOneAndUpdate(
      {
        customer: searchModel.customer,
        keyword: searchModel.keyword,
      },
      searchModel,
      { upsert: true }
    );
  }

  async remove(_id: string): Promise<void> {
    if (mongoose.isValidObjectId(_id)) {
      await SearchScheme.findByIdAndDelete(_id);
    }
  }
}

export default SearchMongodb;
