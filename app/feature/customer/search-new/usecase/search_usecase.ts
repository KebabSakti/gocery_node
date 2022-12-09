import SearchModel from "../entity/search_model";
import SearchOption from "../entity/search_option";
import SearchContract from "./contract/search_contract";

class SearchUsecase {
  private repository: SearchContract;

  constructor(repository: SearchContract) {
    this.repository = repository;
  }

  async index(option?: SearchOption | undefined): Promise<SearchModel[]> {
    return await this.repository.index(option);
  }

  async store(searchModel: SearchModel): Promise<void> {
    await this.repository.store(searchModel);
  }

  async remove(_id: string): Promise<void> {
    await this.repository.remove(_id);
  }
}

export default SearchUsecase;
