import CategoryModel from "../entity/model/category_model";
import CategoryOption from "../entity/model/category_option";
import CategoryContract from "../entity/contract/category_contract";

class CategoryUsecase {
  private repository: CategoryContract;

  constructor(repository: CategoryContract) {
    this.repository = repository;
  }

  async index(option?: CategoryOption): Promise<CategoryModel[]> {
    return await this.repository.index(option);
  }
}

export default CategoryUsecase;
