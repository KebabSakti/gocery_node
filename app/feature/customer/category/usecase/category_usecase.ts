import CategoryModel from "../entity/category_model";
import CategoryOption from "../entity/category_option";
import CategoryContract from "./contract/category_contract";

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
