import mongoose from "mongoose";
import SearchOption from "./../model/search_option";
import PagingOption from "../../../../core/model/paging_option";
import { SearchModel, SearchScheme } from "../model/search_model";
import SearchRepository from "../repository/search_repository";

class SearchMongo implements SearchRepository {
  async index(
    searchOption: SearchOption,
    pagingOption: PagingOption
  ): Promise<SearchModel[]> {
    let results: SearchModel[] = [];

    if (mongoose.isValidObjectId(searchOption.customerId)) {
      const query = SearchScheme.find({
        customer: searchOption.customerId,
      })
        .sort({ created_at: "desc" })
        .select("-active -created_at -updated_at -__v");

      if (searchOption.keyword != undefined) {
        query.where({
          keyword: { $regex: searchOption.keyword, $options: "i" },
        });
      }

      query.skip(pagingOption.offset).limit(pagingOption.limit);

      results = await query.exec();
    }

    return results;
  }

  async store(searchModel: SearchModel): Promise<void> {
    if (mongoose.isValidObjectId(searchModel.customer)) {
      await SearchScheme.findOneAndUpdate(
        {
          customer: searchModel.customer,
          keyword: searchModel.keyword,
        },
        searchModel,
        { upsert: true }
      );
    }
  }

  async remove(id: string): Promise<void> {
    if (mongoose.isValidObjectId(id)) {
      await SearchScheme.deleteOne({ _id: id });
    }
  }
}

export default SearchMongo;
