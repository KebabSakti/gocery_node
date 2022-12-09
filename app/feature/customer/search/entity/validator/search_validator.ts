import SearchModel from "../model/search_model";

abstract class SearchValidator {
  abstract store(searchModel: SearchModel): void;
}

export default SearchValidator;
