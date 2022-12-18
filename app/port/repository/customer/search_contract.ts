import SearchModel from "../../../entity/customer/search_model";
import SearchOption from "../../../entity/customer/search_option";

abstract class SearchContract {
  abstract index(option?: SearchOption | undefined): Promise<SearchModel[]>;

  abstract store(searchModel: SearchModel): Promise<void>;

  abstract remove(_id: string): Promise<void>;
}

export default SearchContract;
