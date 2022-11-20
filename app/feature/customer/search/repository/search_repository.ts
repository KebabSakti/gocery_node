import SearchOption from "./../model/search_option";
import PagingOption from "../../../../core/model/paging_option";
import { SearchModel } from "../model/search_model";

abstract class SearchRepository {
  abstract index(
    searchOption: SearchOption,
    pagingOption: PagingOption
  ): Promise<SearchModel[]>;

  abstract store(searchModel: SearchModel): Promise<void>;

  abstract remove(id: string): Promise<void>;
}

export default SearchRepository;
