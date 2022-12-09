import SearchContract from "../entity/contract/search_contract";
import SearchModel from "../entity/model/search_model";
import SearchOption from "../entity/model/search_option";
import SearchValidator from "../entity/validator/search_validator";

class SearchUsecase {
  private repository: SearchContract;
  private validator: SearchValidator;

  constructor(repository: SearchContract, validator: SearchValidator) {
    this.repository = repository;
    this.validator = validator;
  }

  async index(option?: SearchOption | undefined): Promise<SearchModel[]> {
    let searchOption: SearchOption = {};

    if (option != undefined) {
      if (option.keyword != undefined) {
        searchOption = {
          keyword: option.keyword,
          pagination: option.pagination,
        };
      } else {
        searchOption = {
          customer: option.customer,
          pagination: option.pagination,
        };
      }
    }

    return await this.repository.index(searchOption);
  }

  async store(searchModel: SearchModel): Promise<void> {
    this.validator.store(searchModel);

    await this.repository.store(searchModel);
  }

  async remove(_id: string): Promise<void> {
    await this.repository.remove(_id);
  }
}

export default SearchUsecase;
