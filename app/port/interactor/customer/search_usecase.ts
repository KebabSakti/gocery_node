import SearchModel from "../../../entity/customer/search_model";
import SearchOption from "../../../entity/customer/search_option";
import SearchContract from "../../repository/customer/search_contract";

class SearchUsecase {
  private repository: SearchContract;

  constructor(repository: SearchContract) {
    this.repository = repository;
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
    await this.repository.store(searchModel);
  }

  async remove(_id: string): Promise<void> {
    await this.repository.remove(_id);
  }
}

export default SearchUsecase;
