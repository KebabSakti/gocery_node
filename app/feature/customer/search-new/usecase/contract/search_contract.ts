import SearchOption from "../../entity/search_option";
import SearchModel from "../../entity/search_model";

abstract class SearchContract {
  abstract index(option?: SearchOption | undefined): Promise<SearchModel[]>;

  abstract store(searchModel: SearchModel): Promise<void>;

  abstract remove(_id: string): Promise<void>;
}

export default SearchContract;
