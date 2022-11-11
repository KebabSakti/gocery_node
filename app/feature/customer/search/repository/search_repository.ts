import PaginationOption from "../../../../core/model/pagination_option";
import SearchModel from "../model/search_model";
import SearchOption from "../model/search_option";

abstract class SearchRepository {
  abstract index(
    searchOption?: SearchOption,
    paginationOption?: PaginationOption
  ): Promise<SearchModel[]>;

  abstract store(searchModel: SearchModel): Promise<void>;

  abstract remove(uid: string): Promise<void>;
}

export default SearchRepository;
